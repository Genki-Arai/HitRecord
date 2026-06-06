import { useRef, useState } from "react";
import {
  categoryType,
  target_distanceType,
  target_typeType,
} from "../../db/repositories/SessionRepository.type";
import {
  Alert,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
    JudgeResultType,
  ShotPropType,
  TargetUIHandleType,
} from "../../components/target/TargetUI.type";
import { TargetUI } from "../../components/target/TargetUI";
import ArrowSlotItem from "../../components/input/ArrowSlotItem";
import { SessionRepository } from "../../db/repositories/SessionRepository";
import { RoundRepository } from "../../db/repositories/RoundRepository";
import { ShotRepository } from "../../db/repositories/ShotRepository";
import { set } from "date-fns";


const WINDOW_WIDTH = Dimensions.get("window").width;
const TARGET_SIZE = WINDOW_WIDTH * 0.75;

export default () => {
  const [category, setCategory] = useState<categoryType>("practice");
  const [totalArrows, setTotalArrows] = useState<number>(4);
  const [positionIndex, setPositionIndex] = useState<number>(0);
  const [targetDistance, setTargetDistance] =
    useState<target_distanceType>("close");
  const [targetType, setTargetType] = useState<target_typeType>("kasumi");

  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [weather, setWeather] = useState<string | undefined>(undefined);
  const [windLevel, setWindLevel] = useState<number | undefined>(undefined);
  const [memo, setMemo] = useState<string>("");
  const [bowId, setBowId] = useState<number | null>(null);
  const [arrowId, setArrowId] = useState<number | null>(null);
  const [stringId, setStringId] = useState<number | null>(null);
  
  // ターゲットUIのref
  const targetUIRef = useRef<TargetUIHandleType>(null);
  const [shots, setShots] = useState<ShotPropType[]>([]);

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [roundId, setRoundId] = useState<number | null>(null);
  const [shotIds, setShotIds] = useState<number[]>([]);
  const isLocked: boolean = sessionId !== null;

  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);

  // ボトムシートのrefとスナップポイントの定義
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["90%"];
  

  const processRelease = async (arrow_index: number, pageX: number, pageY: number) => {
    if(shots.some((shot) => shot.arrow_index === arrow_index)) return; // すでに入力済みの矢は処理しない

    const judgeResult:JudgeResultType | undefined | null = targetUIRef.current?.judge(pageX, pageY); 
            if(judgeResult?.is_inside && arrow_index < totalArrows) {
                const newShot: ShotPropType = {
                    arrow_index: arrow_index,
                    is_hit: judgeResult.is_hit,
                    x_normalized: judgeResult.x_normalized,
                    y_normalized: judgeResult.y_normalized,
                }
                setShots((prev) => [...prev, newShot]);

                const result: number = judgeResult.is_hit ? 1 : 0;
                let targetRoundId: number;
                if(sessionId === null) {
                    const newSessionId: number = await SessionRepository.createSession({
                        category: category,
                        date: date,
                        location: location,
                        weather: weather,
                        wind_level: windLevel,
                        memo: memo,
                        target_distance: targetDistance,
                        target_type: targetType,
                        equipment_bow_id: bowId,
                        equipment_arrow_id: arrowId,
                        equipment_string_id: stringId,
                    });
                    setSessionId(newSessionId);

                    targetRoundId = await RoundRepository.createRound(newSessionId, totalArrows, positionIndex);
                    setRoundId(targetRoundId);

                  } else {
                    targetRoundId = roundId!;
                  }
                const newShotId: number = await ShotRepository.createShot({
                      round_id: targetRoundId,
                      arrow_index: arrow_index,
                      result: result,
                      x_coord: judgeResult.x_normalized,
                      y_coord: judgeResult.y_normalized,
                    });

                setShotIds((prev) => [...prev, newShotId]);
            }
  };

  const handleReset = () => {
    Alert.alert(
      "入力内容のリセット",
      "入力内容をリセットしますか？",
      [
        { text: "キャンセル", style: "cancel" },
        { text: "リセット", style: "destructive", onPress: () => resetInputDatas() },
      ]
    )
  }

  const resetInputDatas = async () => {
    if(sessionId === null) {
      
    } else {
      await RoundRepository.deleteRound(roundId!);
      await SessionRepository.deleteSession(sessionId);
      setRoundId(null);
      setSessionId(null);
    }
    setCategory("practice");
    setTotalArrows(4);
    setPositionIndex(0);
    setTargetDistance("close");
    setTargetType("kasumi");
    setDate(new Date().toISOString().split("T")[0]);
    setLocation(undefined);
    setWeather(undefined);
    setWindLevel(undefined);
    setMemo("");
    setBowId(null);
    setArrowId(null);
    setStringId(null);
    setShots([]);
    setShotIds([]);
  }

  const handleShotDragEnd = (arrow_index: number, x_normalized: number, y_normalized: number) => {
    setShots((prevShots) => (
      prevShots.map((shot) => (
        shot.arrow_index === arrow_index
          ? {...shot, x_normalized, y_normalized }
          : shot
      ))
    ))
  }

  const categoryOptions: { label: string; value: categoryType }[] = [
    { label: "稽古", value: "practice" },
    { label: "試合", value: "match" },
    { label: "審査", value: "test" },
    { label: "その他", value: "other" },
  ];

  const totalArrowsOptions: { label: string; value: number }[] = [
    1, 2, 3, 4, 5, 6, 8, 12,
  ].map((totalArrows) => {
    return { label: `${totalArrows}本`, value: totalArrows };
  });

  const positionIndexOptions: { label: string; value: number }[] = [
    { label: "大前", value: 0 },
    { label: "二的", value: 1 },
    { label: "中", value: 2 },
    { label: "落前", value: 3 },
    { label: "落", value: 4 },
  ];

  const targetDistanceOptions: { label: string; value: target_distanceType }[] =
    [
      { label: "近的", value: "close" },
      { label: "遠的", value: "far" },
    ];

  const targetTypeOptions: { label: string; value: target_typeType }[] = [
    { label: "霞的", value: "kasumi" },
    // 拡張 → { label: '星的', value: 'hoshi' }, { label: '得点的', value: 'tokuten' }
  ];

  const weatherOptions: { label: string; value: string }[] = [
    { label: "晴れ", value: "sunny" },
    { label: "曇り", value: "cloudy" },
    { label: "雨", value: "rainy" },
    { label: "雪", value: "snowy" },
    { label: "その他", value: "other" },
  ];

  const windLevelOptions: { label: string; value: number }[] = [
    { label: "無風", value: 0 },
    { label: "微風", value: 1 },
    { label: "弱風", value: 2 },
    { label: "中風", value: 3 },
    { label: "強風", value: 4 },
    { label: "暴風", value: 5 },
  ];

  return (
    <View>
      <View>
        <View>
          <Text>イベント</Text>
          <Dropdown
            labelField="label"
            valueField="value"
            data={categoryOptions}
            value={category}
            onChange={(item) => setCategory(item.value)}
            disable={isLocked}
          />
        </View>
        <View>
          <Text>矢数</Text>
          <Dropdown
            labelField="label"
            valueField="value"
            data={totalArrowsOptions}
            value={totalArrows}
            onChange={(item) => setTotalArrows(item.value)}
            disable={isLocked}
          />
        </View>
        <View>
          <Text>立ち位置</Text>
          <Dropdown
            labelField="label"
            valueField="value"
            data={positionIndexOptions}
            value={positionIndex}
            onChange={(item) => setPositionIndex(item.value)}
            disable={isLocked}
          />
        </View>
        <View>
          <Text>近的・遠的</Text>
          <Dropdown
            labelField="label"
            valueField="value"
            data={targetDistanceOptions}
            value={targetDistance}
            onChange={(item) => setTargetDistance(item.value)}
            disable={isLocked}
          />
        </View>
        <View>
          <Text>的の種類</Text>
          <Dropdown
            labelField="label"
            valueField="value"
            data={targetTypeOptions}
            value={targetType}
            onChange={(item) => setTargetType(item.value)}
            disable={isLocked}
          />
        </View>
        <View>
          <Text>日付</Text>
          <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
            <Text>{new Date(date).toLocaleDateString()}</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            date={new Date(date)}
            onConfirm={(selectedDate) => {
              setDate(selectedDate.toISOString().split("T")[0]);
              setIsDatePickerVisible(false);
            }}
            onCancel={() => {
              setIsDatePickerVisible(false);
            }}
            locale="ja"
            disabled={isLocked}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
            <Text>詳細</Text>
          </TouchableOpacity>
          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
          >
            <BottomSheetView>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.dismiss()}
              >
                <Text>閉じる</Text>
              </TouchableOpacity>
              <View>
                <Text>場所</Text>
                <TextInput
                  value={location}
                  onEndEditing={(e) => setLocation(e.nativeEvent.text)}
                  editable={!isLocked}
                  placeholder="道場"
                />
              </View>
              <View>
                <Text>天候</Text>
                <Dropdown
                  labelField="label"
                  valueField="value"
                  data={weatherOptions}
                  value={weather}
                  onChange={(item) => setWeather(item.value)}
                  disable={isLocked}
                />
              </View>
              <View>
                <Text>風量</Text>
                <Dropdown
                  labelField="label"
                  valueField="value"
                  data={windLevelOptions}
                  value={windLevel}
                  onChange={(item) => setWindLevel(item.value)}
                  disable={isLocked}
                />
              </View>
              <View>
                <Text>メモ</Text>
                <TextInput
                  value={memo}
                  onEndEditing={(e) => setMemo(e.nativeEvent.text)}
                  multiline
                  numberOfLines={4}
                  placeholder="使用感や体調など、自由に記録しましょう"
                />
              </View>
              <View>
                <Text>弓</Text>
                <Dropdown
                  labelField="label"
                  valueField="value"
                  data={[]} // 弓データをここにセット
                  value={bowId}
                  onChange={(item) => setBowId(item.value)}
                />
              </View>
              <View>
                <Text>矢</Text>
                <Dropdown
                  labelField="label"
                  valueField="value"
                  data={[]} // 矢データをここにセット
                  value={arrowId}
                  onChange={(item) => setArrowId(item.value)}
                />
              </View>
              <View>
                <Text>弦</Text>
                <Dropdown
                  labelField="label"
                  valueField="value"
                  data={[]} // 弦データをここにセット
                  value={stringId}
                  onChange={(item) => setStringId(item.value)}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={handleReset}>
          <Text>リセット</Text>
        </TouchableOpacity>
      </View>
      <View>

        <TargetUI
          ref={targetUIRef}
          mode="input"
          shots={shots}
          size={TARGET_SIZE}
          onShotDragEnd={handleShotDragEnd}
          />
      </View>
      <View>
          {(function() {
            const slots = [];
            for (let i = 0; i < totalArrows; i++) {
              slots.push(
                <ArrowSlotItem
                  key={i}
                  arrow_index={i}
                  isRecorded={shots.some((shot) => shot.arrow_index === i)}
                  shot={shots.find((shot) => shot.arrow_index === i)}
                  onFinalize={processRelease}
                />
              )
            }
            return slots;
          })()}
      </View>
    </View>
  );
};

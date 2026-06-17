export type BlueprintDimension =
  | "securityNeed"
  | "pace"
  | "communication"
  | "conflict"
  | "independence"
  | "emotionalSensitivity";

export type RelationshipArchetype =
  | "dreamer"
  | "guardian"
  | "deep_feeler"
  | "rational_observer"
  | "free_explorer"
  | "secure_builder"
  | "independent_traveler"
  | "emotional_healer";

export type LoveArchetype = RelationshipArchetype;

export type LoveAnswerOption = {
  id: string;
  label: string;
  dimensionScores: Partial<Record<BlueprintDimension, number>>;
  archetypeScores: Partial<Record<RelationshipArchetype, number>>;
};

export type LoveQuestion = {
  id: string;
  prompt: string;
  dimension: BlueprintDimension;
  options: LoveAnswerOption[];
};

function option(
  id: string,
  label: string,
  dimensionScores: Partial<Record<BlueprintDimension, number>>,
  archetypeScores: Partial<Record<RelationshipArchetype, number>>
): LoveAnswerOption {
  return { id, label, dimensionScores, archetypeScores };
}

function question(
  id: string,
  dimension: BlueprintDimension,
  prompt: string,
  options: [LoveAnswerOption, LoveAnswerOption, LoveAnswerOption, LoveAnswerOption]
): LoveQuestion {
  return { id, dimension, prompt, options };
}

export const loveQuestions: LoveQuestion[] = [
  question("q1", "securityNeed", "當你在乎的人突然一整天沒有回訊息時，你最可能：", [
    option("q1-a", "開始回想自己是不是哪句話說得不夠好", { securityNeed: 3, emotionalSensitivity: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q1-b", "先告訴自己對方可能只是忙，晚點再觀察", { securityNeed: 1, communication: 1 }, { secure_builder: 2, rational_observer: 1 }),
    option("q1-c", "不主動追問，等對方自己回來說明", { securityNeed: 0, independence: 2 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q1-d", "把注意力轉去工作、朋友或自己的安排", { securityNeed: -1, independence: 3 }, { free_explorer: 2, independent_traveler: 2 })
  ]),
  question("q2", "securityNeed", "約好見面前，對方臨時說想改時間，你會：", [
    option("q2-a", "表面接受，但心裡會覺得自己好像不夠重要", { securityNeed: 3, emotionalSensitivity: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q2-b", "問清楚原因，確認不是關係出問題", { securityNeed: 2, communication: 2 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q2-c", "看對方後續是否有補償或重新安排", { securityNeed: 1, communication: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q2-d", "剛好也把時間留給自己，不太受影響", { securityNeed: -1, independence: 3 }, { free_explorer: 2, independent_traveler: 2 })
  ]),
  question("q3", "securityNeed", "一段關係剛開始變穩定時，你最需要的是：", [
    option("q3-a", "明確知道對方把你放在什麼位置", { securityNeed: 3, pace: 2 }, { guardian: 2, deep_feeler: 1 }),
    option("q3-b", "有固定互動，但不用每天報備", { securityNeed: 1, independence: 1 }, { secure_builder: 2, rational_observer: 1 }),
    option("q3-c", "保留彼此空間，讓關係自然長出節奏", { securityNeed: 0, independence: 2 }, { free_explorer: 2, independent_traveler: 1 }),
    option("q3-d", "先看相處品質，不急著定義關係", { securityNeed: 0, pace: -1 }, { rational_observer: 2, free_explorer: 1 })
  ]),
  question("q4", "securityNeed", "如果對方在聚會中和別人聊得很熱絡，你會：", [
    option("q4-a", "忍不住觀察細節，想知道自己是不是被忽略", { securityNeed: 3, emotionalSensitivity: 3 }, { deep_feeler: 2, guardian: 1 }),
    option("q4-b", "等私下時用輕鬆方式確認你的感受", { securityNeed: 2, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q4-c", "覺得那只是社交，不會立刻放大", { securityNeed: 0, conflict: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q4-d", "自己也去認識其他人，不把注意力都放在對方身上", { securityNeed: -1, independence: 3 }, { free_explorer: 2, independent_traveler: 1 })
  ]),
  question("q5", "securityNeed", "對方說「最近想多一點自己的時間」，你第一個反應是：", [
    option("q5-a", "擔心這是不是關係變淡的前兆", { securityNeed: 3, emotionalSensitivity: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q5-b", "想知道這段時間你們要怎麼維持連結", { securityNeed: 2, communication: 2 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q5-c", "可以接受，但會觀察對方是否仍然投入", { securityNeed: 1, conflict: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q5-d", "覺得這很健康，你也需要自己的空間", { securityNeed: -1, independence: 3 }, { independent_traveler: 2, free_explorer: 1 })
  ]),
  question("q6", "securityNeed", "當關係進入曖昧不明的狀態，你通常會：", [
    option("q6-a", "想趕快知道答案，不喜歡懸著", { securityNeed: 3, pace: 2 }, { guardian: 2, deep_feeler: 1 }),
    option("q6-b", "用互動頻率和對方行動慢慢判斷", { securityNeed: 1, communication: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q6-c", "享受過程，但不急著承諾", { securityNeed: 0, pace: -1, independence: 1 }, { free_explorer: 2, dreamer: 1 }),
    option("q6-d", "避免太投入，直到對方表現足夠明確", { securityNeed: 2, independence: 1 }, { independent_traveler: 2, rational_observer: 1 })
  ]),
  question("q7", "securityNeed", "你最容易因為哪件小事開始不安？", [
    option("q7-a", "對方語氣變短、表情變淡", { securityNeed: 3, emotionalSensitivity: 3 }, { deep_feeler: 2, emotional_healer: 1 }),
    option("q7-b", "重要約定被取消，卻沒有新的安排", { securityNeed: 2, communication: 1 }, { guardian: 2, secure_builder: 1 }),
    option("q7-c", "對方說法前後不一致", { securityNeed: 1, communication: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q7-d", "對方過度要求你交代行程", { securityNeed: -1, independence: 3 }, { independent_traveler: 2, free_explorer: 1 })
  ]),
  question("q8", "pace", "遇到很有好感的人，你通常會：", [
    option("q8-a", "很快投入，想讓對方知道你的在意", { pace: 3, emotionalSensitivity: 1 }, { deep_feeler: 2, dreamer: 1 }),
    option("q8-b", "熱情互動，但仍保留一點觀察距離", { pace: 2, communication: 1 }, { dreamer: 2, rational_observer: 1 }),
    option("q8-c", "慢慢熟悉，等生活節奏自然重疊", { pace: 0, securityNeed: 1 }, { secure_builder: 2, guardian: 1 }),
    option("q8-d", "先確認對方是否尊重你的界線", { pace: -1, independence: 2 }, { independent_traveler: 2, rational_observer: 1 })
  ]),
  question("q9", "pace", "剛開始約會時，對方每天都想見面，你會：", [
    option("q9-a", "覺得被重視，容易更快靠近", { pace: 3, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q9-b", "開心，但會安排固定而不過量的見面", { pace: 1, communication: 1 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q9-c", "需要一點喘息，不想太快密集", { pace: -1, independence: 2 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q9-d", "覺得新鮮感很好，但不想被固定住", { pace: 1, independence: 3 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q10", "pace", "對方很早談到未來規劃，你會：", [
    option("q10-a", "覺得安心，開始想像兩人的生活", { pace: 3, securityNeed: 2 }, { guardian: 2, deep_feeler: 1 }),
    option("q10-b", "願意討論，但會看行動是否跟得上", { pace: 1, communication: 2 }, { secure_builder: 2, rational_observer: 1 }),
    option("q10-c", "覺得太快，想先確認相處品質", { pace: -1, conflict: 1 }, { rational_observer: 2, independent_traveler: 1 }),
    option("q10-d", "對未來有興趣，但不想太早被定型", { pace: 0, independence: 2 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q11", "pace", "一段關係最吸引你的階段通常是：", [
    option("q11-a", "剛確認彼此在意、情感快速升溫時", { pace: 3, emotionalSensitivity: 1 }, { dreamer: 2, deep_feeler: 1 }),
    option("q11-b", "開始建立默契、能穩定陪伴時", { pace: 1, securityNeed: 1 }, { secure_builder: 2, guardian: 1 }),
    option("q11-c", "彼此還有空間，但互相欣賞時", { pace: 0, independence: 2 }, { free_explorer: 2, independent_traveler: 1 }),
    option("q11-d", "經過觀察後，確定價值觀相近時", { pace: -1, communication: 1 }, { rational_observer: 2, secure_builder: 1 })
  ]),
  question("q12", "pace", "如果對方三週內就想確認關係，你會：", [
    option("q12-a", "若感覺對了，會願意認真進入", { pace: 3, securityNeed: 1 }, { deep_feeler: 2, dreamer: 1 }),
    option("q12-b", "想先談清楚期待與界線", { pace: 1, communication: 2 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q12-c", "覺得還需要更多時間觀察", { pace: -1, communication: 1 }, { rational_observer: 2, guardian: 1 }),
    option("q12-d", "會有壓力，因為你不想太快失去彈性", { pace: -2, independence: 3 }, { independent_traveler: 2, free_explorer: 1 })
  ]),
  question("q13", "pace", "關係穩定後，你比較希望：", [
    option("q13-a", "兩人的生活快速融合，像真正的夥伴", { pace: 3, securityNeed: 2 }, { guardian: 2, secure_builder: 1 }),
    option("q13-b", "慢慢調整生活節奏，不急著全部合併", { pace: 0, communication: 1 }, { secure_builder: 2, rational_observer: 1 }),
    option("q13-c", "保留各自圈子，偶爾有高品質相處", { pace: -1, independence: 3 }, { independent_traveler: 2, free_explorer: 1 }),
    option("q13-d", "維持探索感，不讓關係變得太制式", { pace: 1, independence: 2 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q14", "pace", "面對心動但不確定的人，你會：", [
    option("q14-a", "先靠近，因為感受需要被回應", { pace: 3, emotionalSensitivity: 2 }, { deep_feeler: 2, dreamer: 1 }),
    option("q14-b", "製造互動機會，觀察對方是否主動", { pace: 1, communication: 1 }, { dreamer: 2, rational_observer: 1 }),
    option("q14-c", "把節奏放慢，避免被情緒推著走", { pace: -1, conflict: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q14-d", "讓它自然發展，不想因為心動改變生活重心", { pace: 0, independence: 3 }, { independent_traveler: 2, free_explorer: 1 })
  ]),
  question("q15", "communication", "你有不舒服的感受時，通常會：", [
    option("q15-a", "先消化很久，等情緒穩了再說", { communication: 0, conflict: 1 }, { guardian: 2, rational_observer: 1 }),
    option("q15-b", "盡快說出來，希望不要累積誤會", { communication: 3, conflict: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q15-c", "用比較委婉的方式暗示對方", { communication: 1, emotionalSensitivity: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q15-d", "除非很嚴重，不然會自己處理", { communication: -1, independence: 2 }, { independent_traveler: 2, rational_observer: 1 })
  ]),
  question("q16", "communication", "對方問你「你怎麼了」時，你最可能：", [
    option("q16-a", "直接說出事件、感受和期待", { communication: 3, conflict: 2 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q16-b", "先說沒事，但希望對方再多關心一點", { communication: 0, emotionalSensitivity: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q16-c", "需要一點時間整理，再回來談", { communication: 1, independence: 1 }, { rational_observer: 2, independent_traveler: 1 }),
    option("q16-d", "轉移話題，避免氣氛變沉重", { communication: -1, conflict: -1 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q17", "communication", "討論關係問題時，你比較在意：", [
    option("q17-a", "對方有沒有理解你真正的感受", { communication: 2, emotionalSensitivity: 2 }, { deep_feeler: 2, emotional_healer: 1 }),
    option("q17-b", "能不能找出具體做法，避免重複發生", { communication: 3, conflict: 2 }, { secure_builder: 2, rational_observer: 1 }),
    option("q17-c", "語氣不要太逼迫，彼此都能保留空間", { communication: 1, independence: 2 }, { independent_traveler: 2, emotional_healer: 1 }),
    option("q17-d", "不要把事情講得太複雜，能過就過", { communication: -1, conflict: -1 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q18", "communication", "你希望對方表達愛的方式是：", [
    option("q18-a", "說清楚、做得到，讓你感覺被放在心上", { communication: 2, securityNeed: 2 }, { guardian: 2, secure_builder: 1 }),
    option("q18-b", "能主動分享生活，不讓你一直猜", { communication: 3, securityNeed: 2 }, { deep_feeler: 2, emotional_healer: 1 }),
    option("q18-c", "尊重你的節奏，不用過度黏著", { communication: 1, independence: 3 }, { independent_traveler: 2, free_explorer: 1 }),
    option("q18-d", "用行動和默契表達，不一定要說很多", { communication: 0, conflict: 1 }, { rational_observer: 2, secure_builder: 1 })
  ]),
  question("q19", "communication", "如果你覺得對方沒有聽懂你，你會：", [
    option("q19-a", "再說一次，並試著舉生活例子", { communication: 3, conflict: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q19-b", "感到受傷，開始懷疑自己是不是太麻煩", { communication: 0, emotionalSensitivity: 3 }, { deep_feeler: 2, guardian: 1 }),
    option("q19-c", "先停止對話，等對方願意理解再談", { communication: 1, independence: 1 }, { rational_observer: 2, independent_traveler: 1 }),
    option("q19-d", "覺得算了，反正很多事說了也不一定有用", { communication: -2, conflict: -1 }, { independent_traveler: 2, guardian: 1 })
  ]),
  question("q20", "communication", "當你想要更多陪伴時，你會：", [
    option("q20-a", "直接提出希望一起做的事", { communication: 3, securityNeed: 1 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q20-b", "用撒嬌或暗示看看對方接不接得住", { communication: 1, emotionalSensitivity: 2 }, { dreamer: 2, deep_feeler: 1 }),
    option("q20-c", "先等對方主動，避免自己顯得太需要", { communication: -1, securityNeed: 2 }, { guardian: 2, deep_feeler: 1 }),
    option("q20-d", "提醒自己也可以安排自己的生活", { communication: 0, independence: 3 }, { independent_traveler: 2, free_explorer: 1 })
  ]),
  question("q21", "communication", "你最不喜歡哪種溝通狀態？", [
    option("q21-a", "話說到一半，對方突然消失", { communication: 2, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q21-b", "問題一直繞圈，沒有結論", { communication: 3, conflict: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q21-c", "對方用情緒逼你立刻表態", { communication: 1, independence: 3 }, { independent_traveler: 2, free_explorer: 1 }),
    option("q21-d", "每件小事都要深度討論", { communication: -1, independence: 2 }, { free_explorer: 2, rational_observer: 1 })
  ]),
  question("q22", "conflict", "發生爭執時，你最自然的反應是：", [
    option("q22-a", "想立刻把事情說清楚，不想隔夜", { conflict: 3, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q22-b", "先安撫關係，再慢慢談問題", { conflict: 2, securityNeed: 2 }, { guardian: 2, emotional_healer: 1 }),
    option("q22-c", "需要冷靜一下，避免說出後悔的話", { conflict: 0, independence: 1 }, { rational_observer: 2, independent_traveler: 1 }),
    option("q22-d", "暫時抽離，等情緒過了再看要不要談", { conflict: -1, independence: 2 }, { independent_traveler: 2, free_explorer: 1 })
  ]),
  question("q23", "conflict", "對方語氣變重時，你會：", [
    option("q23-a", "情緒很快被影響，開始防衛或難過", { conflict: -1, emotionalSensitivity: 3 }, { deep_feeler: 2, guardian: 1 }),
    option("q23-b", "提醒對方先把語氣放低，再繼續談", { conflict: 3, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q23-c", "抓重點，不讓語氣蓋過問題本身", { conflict: 2, communication: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q23-d", "直接暫停對話，保護自己的狀態", { conflict: 0, independence: 2 }, { independent_traveler: 2, guardian: 1 })
  ]),
  question("q24", "conflict", "冷戰發生時，你通常會：", [
    option("q24-a", "很難受，想盡快恢復連結", { conflict: 2, securityNeed: 3 }, { deep_feeler: 2, guardian: 1 }),
    option("q24-b", "主動開口，但希望對方也負責任", { conflict: 3, communication: 2 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q24-c", "觀察對方是否願意打破僵局", { conflict: 0, communication: 1 }, { rational_observer: 2, guardian: 1 }),
    option("q24-d", "把自己抽回來，直到對方態度清楚", { conflict: -1, independence: 2 }, { independent_traveler: 2, rational_observer: 1 })
  ]),
  question("q25", "conflict", "如果你知道自己也有錯，你會：", [
    option("q25-a", "主動道歉，並說明你在意的是什麼", { conflict: 3, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q25-b", "先確認對方還願不願意靠近你", { conflict: 1, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q25-c", "整理責任歸屬，不想把所有錯都攬下來", { conflict: 2, independence: 1 }, { rational_observer: 2, independent_traveler: 1 }),
    option("q25-d", "需要時間消化羞愧感，之後再處理", { conflict: 0, emotionalSensitivity: 2 }, { guardian: 2, deep_feeler: 1 })
  ]),
  question("q26", "conflict", "面對反覆出現的問題，你傾向：", [
    option("q26-a", "建立明確規則，避免一直重演", { conflict: 3, communication: 2 }, { secure_builder: 2, rational_observer: 1 }),
    option("q26-b", "看見彼此背後的需求，再一起調整", { conflict: 3, emotionalSensitivity: 1 }, { emotional_healer: 2, guardian: 1 }),
    option("q26-c", "如果對方沒有改變，就重新評估關係", { conflict: 1, independence: 2 }, { rational_observer: 2, independent_traveler: 1 }),
    option("q26-d", "不想一直談同一件事，會降低投入", { conflict: -1, independence: 2 }, { free_explorer: 2, independent_traveler: 1 })
  ]),
  question("q27", "conflict", "你覺得最健康的和好方式是：", [
    option("q27-a", "抱抱或靠近，先確認彼此還在", { conflict: 2, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q27-b", "說出原因、感受和下一次怎麼做", { conflict: 3, communication: 3 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q27-c", "給彼此一點空間，再自然恢復", { conflict: 1, independence: 2 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q27-d", "不要太沉重，找回輕鬆感就好", { conflict: 0, independence: 1 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q28", "conflict", "當對方提出批評時，你會：", [
    option("q28-a", "先感到受傷，但會努力理解對方意思", { conflict: 1, emotionalSensitivity: 3 }, { deep_feeler: 2, emotional_healer: 1 }),
    option("q28-b", "請對方講具體例子，避免變成指責", { conflict: 3, communication: 2 }, { rational_observer: 2, secure_builder: 1 }),
    option("q28-c", "如果語氣不尊重，你會先停止對話", { conflict: 1, independence: 2 }, { independent_traveler: 2, guardian: 1 }),
    option("q28-d", "表面聽完，心裡開始拉開距離", { conflict: -1, independence: 1 }, { guardian: 2, rational_observer: 1 })
  ]),
  question("q29", "independence", "進入穩定關係後，你希望自己的生活：", [
    option("q29-a", "多數重要安排都能和對方一起決定", { independence: -1, securityNeed: 2 }, { guardian: 2, deep_feeler: 1 }),
    option("q29-b", "有共同規劃，也保留個人時間", { independence: 1, communication: 1 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q29-c", "各自有明確生活重心，再共享重要時刻", { independence: 3, pace: -1 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q29-d", "保持彈性，不想被固定模式限制", { independence: 3, pace: 0 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q30", "independence", "對方想知道你每天的行程，你會：", [
    option("q30-a", "覺得被在乎，願意分享很多細節", { independence: -1, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q30-b", "分享大方向，但不希望像報備", { independence: 2, communication: 1 }, { secure_builder: 2, independent_traveler: 1 }),
    option("q30-c", "感到壓力，想重新談界線", { independence: 3, communication: 2 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q30-d", "如果太頻繁，你會想逃開", { independence: 3, conflict: -1 }, { free_explorer: 2, independent_traveler: 1 })
  ]),
  question("q31", "independence", "你理想中的週末相處是：", [
    option("q31-a", "大部分時間一起度過，累積親密感", { independence: -1, securityNeed: 2 }, { guardian: 2, deep_feeler: 1 }),
    option("q31-b", "安排一段高品質相處，也留一些自己的時間", { independence: 1, communication: 1 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q31-c", "各自完成想做的事，再分享生活", { independence: 3, pace: -1 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q31-d", "看當下興致，不想每週都一樣", { independence: 2, pace: 1 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q32", "independence", "如果對方不喜歡你的朋友或興趣，你會：", [
    option("q32-a", "試著協調，希望兩邊都不要受傷", { independence: 0, emotionalSensitivity: 2 }, { emotional_healer: 2, guardian: 1 }),
    option("q32-b", "了解原因，但不會輕易放棄自己的生活", { independence: 3, communication: 2 }, { independent_traveler: 2, secure_builder: 1 }),
    option("q32-c", "理性評估對方的擔心是否有道理", { independence: 2, communication: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q32-d", "覺得被限制，會想拉開距離", { independence: 3, conflict: -1 }, { free_explorer: 2, independent_traveler: 1 })
  ]),
  question("q33", "independence", "你最害怕關係變成：", [
    option("q33-a", "明明在一起，卻感覺不被重視", { independence: 0, securityNeed: 3 }, { deep_feeler: 2, guardian: 1 }),
    option("q33-b", "沒有共同方向，只剩習慣", { independence: 1, communication: 2 }, { secure_builder: 2, rational_observer: 1 }),
    option("q33-c", "失去自己的節奏，什麼都要配合對方", { independence: 3, communication: 1 }, { independent_traveler: 2, free_explorer: 1 }),
    option("q33-d", "太無聊、太制式，沒有成長和新鮮感", { independence: 2, pace: 1 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q34", "independence", "伴侶希望你搬近一點或同住，你會：", [
    option("q34-a", "如果關係穩定，會覺得更安心", { independence: -1, securityNeed: 2 }, { guardian: 2, secure_builder: 1 }),
    option("q34-b", "願意討論生活規則和個人空間", { independence: 1, communication: 2 }, { secure_builder: 2, emotional_healer: 1 }),
    option("q34-c", "需要很明確的私人空間才會考慮", { independence: 3, communication: 1 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q34-d", "短期內不想，怕關係太快變沉重", { independence: 3, pace: -1 }, { free_explorer: 2, independent_traveler: 1 })
  ]),
  question("q35", "independence", "當你壓力很大時，你比較需要：", [
    option("q35-a", "對方陪在旁邊，讓你感覺不是一個人", { independence: -1, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q35-b", "對方聽你說，也幫你整理問題", { independence: 0, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q35-c", "自己安靜處理，之後再分享結果", { independence: 3, communication: 0 }, { independent_traveler: 2, rational_observer: 1 }),
    option("q35-d", "換個環境或做點新事，讓狀態流動", { independence: 2, pace: 1 }, { free_explorer: 2, dreamer: 1 })
  ]),
  question("q36", "emotionalSensitivity", "你走進一個氣氛不太對的房間時，通常會：", [
    option("q36-a", "很快察覺誰不開心，並開始在意原因", { emotionalSensitivity: 3, securityNeed: 1 }, { emotional_healer: 2, deep_feeler: 1 }),
    option("q36-b", "觀察一下，但不急著介入", { emotionalSensitivity: 1, communication: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q36-c", "除非有人明說，否則不會想太多", { emotionalSensitivity: -1, independence: 1 }, { free_explorer: 2, rational_observer: 1 }),
    option("q36-d", "先保持距離，避免被氣氛拖進去", { emotionalSensitivity: 1, independence: 2 }, { independent_traveler: 2, guardian: 1 })
  ]),
  question("q37", "emotionalSensitivity", "對方一句無心的話讓你不舒服，你會：", [
    option("q37-a", "反覆想那句話背後是不是有別的意思", { emotionalSensitivity: 3, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q37-b", "找合適時機確認，避免自己猜太久", { emotionalSensitivity: 2, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q37-c", "先判斷是不是自己太累或太敏感", { emotionalSensitivity: 1, conflict: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q37-d", "不太放在心上，除非它反覆出現", { emotionalSensitivity: -1, independence: 1 }, { free_explorer: 2, independent_traveler: 1 })
  ]),
  question("q38", "emotionalSensitivity", "你看到對方情緒低落時，通常會：", [
    option("q38-a", "主動靠近，想知道發生什麼事", { emotionalSensitivity: 3, communication: 2 }, { emotional_healer: 2, deep_feeler: 1 }),
    option("q38-b", "陪著對方，但不逼問", { emotionalSensitivity: 2, independence: 1 }, { guardian: 2, emotional_healer: 1 }),
    option("q38-c", "用實際方法幫忙解決問題", { emotionalSensitivity: 1, communication: 2 }, { secure_builder: 2, rational_observer: 1 }),
    option("q38-d", "給對方空間，相信他能處理", { emotionalSensitivity: 0, independence: 2 }, { independent_traveler: 2, rational_observer: 1 })
  ]),
  question("q39", "emotionalSensitivity", "關係裡的小變化，像回覆變短或見面變少，你會：", [
    option("q39-a", "很快注意到，並開始整理可能原因", { emotionalSensitivity: 3, securityNeed: 2 }, { deep_feeler: 2, guardian: 1 }),
    option("q39-b", "注意到後會找機會溫和確認", { emotionalSensitivity: 2, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q39-c", "先看是不是短期狀態，不急著下結論", { emotionalSensitivity: 1, conflict: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q39-d", "不會立刻解讀，除非對方直接說明", { emotionalSensitivity: -1, independence: 1 }, { free_explorer: 2, independent_traveler: 1 })
  ]),
  question("q40", "emotionalSensitivity", "你最常被哪種情境影響心情？", [
    option("q40-a", "對方明明在身邊，卻感覺心不在你這裡", { emotionalSensitivity: 3, securityNeed: 3 }, { deep_feeler: 2, guardian: 1 }),
    option("q40-b", "你努力表達，對方卻沒有真正接住", { emotionalSensitivity: 3, communication: 2 }, { emotional_healer: 2, deep_feeler: 1 }),
    option("q40-c", "關係裡有問題但沒有人願意面對", { emotionalSensitivity: 2, conflict: 2 }, { secure_builder: 2, rational_observer: 1 }),
    option("q40-d", "對方把自己的情緒全部丟給你承擔", { emotionalSensitivity: 2, independence: 3 }, { independent_traveler: 2, emotional_healer: 1 })
  ]),
  question("q41", "emotionalSensitivity", "當你感覺被冷落時，最常出現的內在反應是：", [
    option("q41-a", "想靠近確認，但又怕自己太需要", { emotionalSensitivity: 3, securityNeed: 3 }, { deep_feeler: 2, guardian: 1 }),
    option("q41-b", "先把感受記下來，找適合時機談", { emotionalSensitivity: 2, communication: 2 }, { emotional_healer: 2, secure_builder: 1 }),
    option("q41-c", "分析這是不是偶發事件，不讓情緒立刻決定", { emotionalSensitivity: 1, conflict: 1 }, { rational_observer: 2, secure_builder: 1 }),
    option("q41-d", "把重心收回自己，避免繼續被影響", { emotionalSensitivity: 1, independence: 3 }, { independent_traveler: 2, free_explorer: 1 })
  ]),
  question("q42", "emotionalSensitivity", "你在關係中最珍惜的理解是：", [
    option("q42-a", "對方能看懂你沒有說出口的失落", { emotionalSensitivity: 3, securityNeed: 2 }, { deep_feeler: 2, emotional_healer: 1 }),
    option("q42-b", "對方願意聽你把複雜感受說完整", { emotionalSensitivity: 2, communication: 3 }, { emotional_healer: 2, guardian: 1 }),
    option("q42-c", "對方尊重你的判斷，不把情緒放大", { emotionalSensitivity: 0, independence: 2 }, { rational_observer: 2, independent_traveler: 1 }),
    option("q42-d", "對方讓相處保持輕盈，不讓愛變成壓力", { emotionalSensitivity: 0, independence: 2 }, { free_explorer: 2, dreamer: 1 })
  ])
];

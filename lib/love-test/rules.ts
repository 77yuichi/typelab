import {
  loveQuestions,
  type BlueprintDimension,
  type LoveArchetype,
  type RelationshipArchetype
} from "./questions";

export type LoveAnswerMap = Record<string, string>;

export type DimensionProfile = {
  label: string;
  score: number;
  index: number;
  level: "低" | "中" | "高";
  description: string;
};

export type HeartCheck = {
  fear: string;
  desire: string;
  overlooked: string;
};

export type LoveResult = {
  primaryArchetype: RelationshipArchetype;
  secondaryArchetype: RelationshipArchetype | null;
  archetypeLabel: string;
  signatureQuote: string;
  title: string;
  aboutYou: string;
  coreStrengths: string[];
  challenges: string[];
  relationshipNeeds: string;
  growthDirection: string;
  heartCheck: HeartCheck;
  dimensionProfiles: Record<BlueprintDimension, DimensionProfile>;
  scores: Record<RelationshipArchetype, number>;
};

type ArchetypeCopy = {
  label: string;
  signatureQuote: string;
  title: string;
  aboutYou: string;
  coreStrengths: string[];
  challenges: string[];
  relationshipNeeds: string;
  growthDirection: string;
  heartCheck: HeartCheck;
};

const dimensionLabels: Record<BlueprintDimension, string> = {
  securityNeed: "安全感需求",
  pace: "感情投入速度",
  communication: "溝通風格",
  conflict: "衝突處理模式",
  independence: "獨立性",
  emotionalSensitivity: "情緒敏感度"
};

export const archetypeCopy: Record<LoveArchetype, ArchetypeCopy> = {
  dreamer: {
    label: "追夢型戀人",
    signatureQuote: "你害怕的從來不是付出。\n而是付出後才發現，\n自己沒有想像中重要。",
    title: "追夢型戀人：你不是太容易心動，你是太容易看見可能",
    aboutYou:
      "你對一段關係的感覺，常常不是慢慢整理出來，而是在某個瞬間突然變得很清楚。可能是對方記得你隨口說過的小事，也可能是一句剛好接住你的話，你會在心裡開始出現一些畫面：如果以後也能這樣相處，會不會很不錯。你不一定會把這些期待說出口，但你會默默觀察對方是不是也把你放進他的生活裡。當對方熱情時，你會被點亮；當對方忽然冷下來，你也會比表面更失落，甚至懷疑是不是自己太快投入。你真正想要的不是戲劇化的浪漫，而是有人願意把你想像的未來，一步一步變成真實。",
    coreStrengths: [
      "你能讓關係有期待感，不只是例行互動或無聊陪伴。",
      "你會記得那些別人以為你沒放在心上的小細節。",
      "你投入時不是只想被愛，也很想讓對方感覺人生變得更亮。"
    ],
    challenges: [
      "你容易把一時的默契，提前理解成長期的承諾。",
      "當對方沒有延續熱度時，你會像是被突然放回現實。",
      "你可能太快替對方想好未來，卻忘了看他現在是否真的有行動。"
    ],
    relationshipNeeds:
      "你需要的不是每天轟轟烈烈，而是當你開始期待時，對方也願意用穩定行動慢慢接住那份期待。比起曖昧帶來的心跳，你更需要知道自己不是對方一時興起的選項。",
    growthDirection: "每次開始想像未來時，也回頭看對方目前的行動是否真的支持這個想像。",
    heartCheck: {
      fear: "你真正害怕的是，自己已經在心裡走很遠了，對方卻只是剛好路過。",
      desire: "你最渴望的是，有人不只享受你的熱情，也願意認真回應你的期待。",
      overlooked: "你最容易忽略的是，心動可以很快，但被珍惜需要看見長期行動。"
    }
  },
  guardian: {
    label: "守護型戀人",
    signatureQuote: "你總是先照顧別人。\n卻很少有人發現，\n你也需要被照顧。",
    title: "守護型戀人：你在意的不是黏著，而是自己有沒有被放在心上",
    aboutYou:
      "你在關係裡最敏感的地方，往往不是對方少回一則訊息，而是那則訊息背後代表的意思。你會注意對方有沒有主動安排、有沒有記得你的感受、有沒有在忙碌時仍然讓你知道你的位置。你不一定會直接說「我需要安全感」，因為你也怕自己聽起來太麻煩；但你心裡其實很清楚，真正讓你安心的不是甜言蜜語，而是對方在關鍵時刻沒有讓你一個人猜。你願意為關係付出很多，會替對方想、會忍耐、會修補氣氛，但你也希望自己的努力能被看見，而不是被當成理所當然。",
    coreStrengths: [
      "你很會照顧關係裡的細節，讓人感覺自己被放在心上。",
      "你願意在關係不穩時先伸手，而不是立刻放棄。",
      "你對承諾有感，也願意把穩定經營成日常。"
    ],
    challenges: [
      "你可能把對方的忙碌，解讀成自己變得不重要。",
      "你常把需求藏起來，等對方自己發現。",
      "你需要避免用過度懂事，換取一段其實不夠回應你的關係。"
    ],
    relationshipNeeds:
      "你需要一段不用一直猜的關係。對你來說，真正的安全感不是對方說得多好聽，而是在忙碌、衝突或距離出現時，仍然願意讓你知道你的位置。",
    growthDirection: "把「你是不是不在乎我」改成「我需要更明確的安排與回應」。",
    heartCheck: {
      fear: "你真正害怕的是，你努力維持的關係，其實只有你一個人在用力。",
      desire: "你最渴望的是，有人能在你還沒開口前，也看見你其實撐得很累。",
      overlooked: "你最容易忽略的是，能照顧別人不代表你不需要被照顧。"
    }
  },
  deep_feeler: {
    label: "深情投入者",
    signatureQuote: "你不是想太多。\n你只是把每個細節，\n都放進心裡確認自己還重不重要。",
    title: "深情投入者：你不是想太多，你只是比別人更快感覺到變化",
    aboutYou:
      "當重要的人態度出現變化時，你往往比大多數人更快察覺。對方回覆變短、語氣少了一點溫度、見面時沒有像平常那樣靠近，這些細節可能都會被你放進心裡反覆整理。你不一定會立刻問出口，因為你也擔心自己是不是太敏感；但你的內在其實已經開始運作：是不是我哪裡做錯了？是不是這段關係開始變了？你投入感情時很深，不只是喜歡對方，而是會把對方的狀態放進自己的情緒裡。你最渴望的是有人願意認真理解你，而不是用一句「你想太多」把你的感受推開。",
    coreStrengths: [
      "你能感受到很多沒有被說出口的情緒與訊號。",
      "你投入後很真誠，願意給出深度陪伴。",
      "你能讓關係不只停留在表面互動，而是進入真正的理解。"
    ],
    challenges: [
      "你容易把模糊訊號往自己身上解讀。",
      "你會在對方還沒說明前，先消耗很多情緒。",
      "你需要練習把事實、感受、猜測分開，不讓每個細節都變成判決。"
    ],
    relationshipNeeds:
      "你需要的不是被安撫一句「沒事」，而是對方願意停下來理解你為什麼會有感覺。你適合情緒穩定、願意溝通，也不會把你的細膩當成負擔的人。",
    growthDirection: "在下結論前，先問自己：我現在掌握的是事實，還是我害怕發生的版本？",
    heartCheck: {
      fear: "你真正害怕的是，自己感覺到的變化是真的，但對方卻說你太敏感。",
      desire: "你最渴望的是，有人願意認真接住你的細膩，而不是要求你變得鈍一點。",
      overlooked: "你最容易忽略的是，不是每個情緒訊號都代表關係正在失去你。"
    }
  },
  rational_observer: {
    label: "理性觀察者",
    signatureQuote: "你其實不是慢熱。\n你只是知道，\n心動很容易，\n但信任很難。",
    title: "理性觀察者：你不是冷淡，你只是需要看見一致性才願意交出信任",
    aboutYou:
      "你在關係裡不太容易只靠心動做決定。即使你對一個人有好感，你也會觀察他的話和行動是否一致、遇到問題時怎麼處理、是否尊重你的界線。你可能不會很快表態，因為你知道一開始的熱情不難，難的是長期的穩定。別人可能覺得你太理性，但其實你只是很清楚：真正適合的人，不只會讓你開心，也要能讓你放心。你的在意常常藏在觀察裡，不是沒有感覺，而是你想確認這份感覺值得被放大。",
    coreStrengths: [
      "你不容易被短暫熱度帶走，能看見關係是否真的適合。",
      "你擅長在衝突中抓住問題本身，而不是只被情緒牽動。",
      "你能建立清楚、成熟、可長期維持的相處規則。"
    ],
    challenges: [
      "你可能太晚表達在意，讓對方以為自己沒有機會。",
      "你有時會用分析取代脆弱，避開真正想被理解的部分。",
      "你需要讓對方知道你的沉默不是不在乎，而是在確認。"
    ],
    relationshipNeeds:
      "你需要的是行動一致、說話算話、能讓你慢慢確認的人。比起被快速追求，你更容易被長期穩定的細節打動。",
    growthDirection: "除了說出你的判斷，也試著說出判斷背後其實有多在意。",
    heartCheck: {
      fear: "你真正害怕的是，自己終於相信了，結果對方只是短暫認真。",
      desire: "你最渴望的是，有人不用逼你交出信任，卻用行動讓你慢慢放心。",
      overlooked: "你最容易忽略的是，太久不表達在意，也會讓值得的人以為自己不被需要。"
    }
  },
  free_explorer: {
    label: "自由探索者",
    signatureQuote: "你不是不想安定。\n你只是害怕，\n愛變成一種限制。",
    title: "自由探索者：你不是不想安定，你只是害怕愛變成一種限制",
    aboutYou:
      "你喜歡關係裡有自然的靠近，也需要保留生活的流動感。當一段關係剛開始時，你可能很享受曖昧、探索和互相吸引的過程；但如果對方太快要求固定模式、太頻繁確認你在哪裡、或把親密變成一套規則，你會開始感覺壓力。你不是不能承諾，而是你希望承諾不是失去自己。你很怕一段關係讓生活變窄，讓你慢慢放棄原本的朋友、興趣、節奏和可能性。你真正想要的是：有人能和你一起靠近，也允許你仍然是你。",
    coreStrengths: [
      "你能讓關係保持新鮮感，不容易落入僵化模式。",
      "你尊重彼此的生活，不會把愛變成控制。",
      "你能提醒伴侶：親密不必等於失去自由。"
    ],
    challenges: [
      "當關係進入穩定期，你可能會把穩定誤讀成無聊。",
      "你有時會在對方需要確認時，先感覺自己被逼迫。",
      "你需要把需要空間說清楚，而不是只用退開表達。"
    ],
    relationshipNeeds:
      "你需要的是能靠近、也能呼吸的關係。對方如果能尊重你的節奏，又願意把期待說清楚，你反而更能安心地留下來。",
    growthDirection: "把「我不想被限制」說成「我需要哪些空間，以及我會如何繼續投入」。",
    heartCheck: {
      fear: "你真正害怕的是，一段關係慢慢把你變成只剩伴侶身份的人。",
      desire: "你最渴望的是，有人能靠近你，卻不急著佔滿你。",
      overlooked: "你最容易忽略的是，對方需要確認，不一定是在控制你。"
    }
  },
  secure_builder: {
    label: "安全築造者",
    signatureQuote: "你要的不是完美關係。\n而是兩個人都願意，\n一起把關係修好。",
    title: "安全築造者：你相信好的關係不是靠猜，而是一起建造出來",
    aboutYou:
      "你在關係裡重視穩定、責任感和能被執行的承諾。你不太喜歡一直靠感覺猜測，也不喜歡問題反覆發生卻沒有人整理。當你在乎一個人，你會想把相處變得更清楚：什麼事會讓彼此不安、衝突時要怎麼修復、未來要怎麼安排。你不是缺少浪漫，而是你知道浪漫如果沒有行動支撐，很快就會變成消耗。你真正被打動的時刻，通常不是對方說了多漂亮的話，而是他在重要時候真的有出現。",
    coreStrengths: [
      "你能把感情落實成行動，讓關係更穩定。",
      "你願意面對問題，而不是讓誤會一直累積。",
      "你很適合經營長期關係，因為你重視修復與一致性。"
    ],
    challenges: [
      "你可能對模糊、不負責任的人很快失去耐心。",
      "你有時太急著解決問題，忘了對方可能先需要被理解。",
      "你需要允許感受有時不能立刻整理成答案。"
    ],
    relationshipNeeds:
      "你需要能一起面對問題的人。比起一開始多浪漫，你更在意對方在衝突、承諾與日常選擇裡，是否願意負責。",
    growthDirection: "在解決問題前，先確認彼此的情緒是否已經被接住。",
    heartCheck: {
      fear: "你真正害怕的是，自己一直在修，對方卻只是等你修好。",
      desire: "你最渴望的是，有人願意和你站在同一邊，而不是把問題丟給你處理。",
      overlooked: "你最容易忽略的是，有些關係不是溝通不夠，而是對方沒有想一起建造。"
    }
  },
  independent_traveler: {
    label: "獨立旅人",
    signatureQuote: "你可以很愛一個人。\n但你不想為了被愛，\n變得不像自己。",
    title: "獨立旅人：你可以很愛一個人，但不想因此失去自己",
    aboutYou:
      "你在關係裡很重視自己的節奏。你不一定需要大量訊息、每天見面或時時報備，反而更在意對方能不能尊重你的生活重心。當你壓力大時，你可能會先自己處理，不是因為不信任對方，而是你習慣先把自己穩住。你可以很深地在乎一個人，只是你的靠近方式不一定是黏著，而是當你選擇出現時，你是真的在。你最怕的是一段關係慢慢要求你交出所有空間，讓你變得不像自己。",
    coreStrengths: [
      "你有清楚界線，不容易在關係裡失去自我。",
      "你能維持自己的生活品質與成長方向。",
      "你不會把伴侶當成唯一重心，因此關係比較不容易窒息。"
    ],
    challenges: [
      "你可能讓對方誤以為你不需要陪伴或安慰。",
      "遇到壓力時，你容易過度自己扛，不讓別人靠近。",
      "你需要主動說明你的靠近方式，否則對方只能猜。"
    ],
    relationshipNeeds:
      "你需要的是尊重界線、彼此都有生活重心的關係。當對方不把你的空間解讀成冷淡，你反而更願意主動靠近。",
    growthDirection: "當你需要空間時，同時告訴對方你會何時回來連結。",
    heartCheck: {
      fear: "你真正害怕的是，愛最後變成一種慢慢失去自己的過程。",
      desire: "你最渴望的是，有人尊重你的完整，而不是只喜歡你配合他的樣子。",
      overlooked: "你最容易忽略的是，讓人靠近不代表你會失去自由。"
    }
  },
  emotional_healer: {
    label: "情感療癒者",
    signatureQuote: "你常常接住別人的情緒。\n卻忘了，\n自己也需要被接住。",
    title: "情感療癒者：你常常看得見別人沒說出口的受傷",
    aboutYou:
      "你在關係裡很容易感受到氣氛的變化。當對方說沒事，你可能還是感覺得到他其實不太對；當衝突發生，你不只想知道誰對誰錯，也會想知道彼此到底在哪裡受傷。你很擅長修復關係，會試著把話說得不那麼刺耳，會照顧對方能不能承受，也常常在對方還沒開口前就先替他想好台階。可是你也容易在不知不覺中承擔太多，像是只要氣氛不好，你就覺得自己應該做點什麼。你需要的不是一直理解別人，而是也有人願意回頭理解你。",
    coreStrengths: [
      "你具有很強的共感能力，能看見情緒背後的需求。",
      "你擅長修復關係，讓衝突不只是對立。",
      "你能讓伴侶感覺被理解、被接住、被溫柔對待。"
    ],
    challenges: [
      "你容易把對方的情緒責任也扛到自己身上。",
      "你可能太快替對方找理由，忽略自己其實也受傷。",
      "你需要分辨陪伴與拯救，不是每個情緒都該由你處理。"
    ],
    relationshipNeeds:
      "你需要的是願意自我覺察，也能反過來照顧你感受的人。你不適合一直扮演修復者，真正好的關係也會把你放回被理解的位置。",
    growthDirection: "在照顧對方前，先問自己：這件事真的應該由我承擔嗎？",
    heartCheck: {
      fear: "你真正害怕的是，自己不再照顧氣氛後，關係就會散掉。",
      desire: "你最渴望的是，有人也能看出你沒說出口的委屈。",
      overlooked: "你最容易忽略的是，理解別人不等於要替別人的情緒負責。"
    }
  }
};

const emptyArchetypeScores: Record<RelationshipArchetype, number> = {
  dreamer: 0,
  guardian: 0,
  deep_feeler: 0,
  rational_observer: 0,
  free_explorer: 0,
  secure_builder: 0,
  independent_traveler: 0,
  emotional_healer: 0
};

const emptyDimensionScores: Record<BlueprintDimension, number> = {
  securityNeed: 0,
  pace: 0,
  communication: 0,
  conflict: 0,
  independence: 0,
  emotionalSensitivity: 0
};

export function calculateLoveResult(answers: LoveAnswerMap): LoveResult {
  const archetypeScores = { ...emptyArchetypeScores };
  const dimensionScores = { ...emptyDimensionScores };

  loveQuestions.forEach((question) => {
    const selectedOptionId = answers[question.id];
    const option = question.options.find((item) => item.id === selectedOptionId);

    if (!option) {
      return;
    }

    Object.entries(option.dimensionScores).forEach(([dimension, value]) => {
      dimensionScores[dimension as BlueprintDimension] += value ?? 0;
    });

    Object.entries(option.archetypeScores).forEach(([archetype, value]) => {
      archetypeScores[archetype as RelationshipArchetype] += value ?? 0;
    });
  });

  const ranked = (Object.entries(archetypeScores) as [RelationshipArchetype, number][]).sort((a, b) => b[1] - a[1]);
  const primaryArchetype = ranked[0][0];
  const secondaryArchetype = ranked[1][1] > 0 ? ranked[1][0] : null;
  const copy = archetypeCopy[primaryArchetype];

  return {
    primaryArchetype,
    secondaryArchetype,
    archetypeLabel: copy.label,
    signatureQuote: copy.signatureQuote,
    title: copy.title,
    aboutYou: copy.aboutYou,
    coreStrengths: copy.coreStrengths,
    challenges: copy.challenges,
    relationshipNeeds: copy.relationshipNeeds,
    growthDirection: copy.growthDirection,
    heartCheck: copy.heartCheck,
    dimensionProfiles: buildDimensionProfiles(dimensionScores),
    scores: archetypeScores
  };
}

export function isCompleteLoveTest(answers: LoveAnswerMap) {
  return loveQuestions.every((question) => Boolean(answers[question.id]));
}

function buildDimensionProfiles(scores: Record<BlueprintDimension, number>) {
  return Object.fromEntries(
    Object.entries(scores).map(([dimension, score]) => {
      const typedDimension = dimension as BlueprintDimension;
      const index = normalizeDimensionScore(score);
      const level = index >= 67 ? "高" : index >= 40 ? "中" : "低";

      return [
        typedDimension,
        {
          label: dimensionLabels[typedDimension],
          score,
          index,
          level,
          description: getDimensionDescription(typedDimension, level)
        }
      ];
    })
  ) as Record<BlueprintDimension, DimensionProfile>;
}

function getDimensionDescription(dimension: BlueprintDimension, level: DimensionProfile["level"]) {
  const descriptions: Record<BlueprintDimension, Record<DimensionProfile["level"], string>> = {
    securityNeed: {
      高: "你很需要明確的回應。真正讓你不安的通常不是距離，而是對方沒有讓你知道自己仍然被放在心上。",
      中: "你能接受一點不確定，但重要關係仍需要基本的穩定訊號，否則你會開始觀察細節。",
      低: "你比較能在關係裡維持自我穩定，不太會只靠對方的即時反應判斷自己是否安全。"
    },
    pace: {
      高: "你一旦感覺對了，很容易開始把對方放進未來想像裡，也會期待關係能更快有方向。",
      中: "你會在心動與觀察之間找平衡，既不想錯過感覺，也不想被感覺推著走。",
      低: "你傾向慢慢確認。對你來說，真正的靠近需要時間證明，而不是一開始的熱度。"
    },
    communication: {
      高: "你適合把感受與期待說清楚。當關係越透明，你越不需要靠猜測消耗自己。",
      中: "你能溝通，但需要合適時機與足夠安全的氛圍；你不喜歡被逼著立刻表態。",
      低: "你常先自己消化，甚至希望事情自然過去。這能保護你，但也可能讓對方不知道你真正的需要。"
    },
    conflict: {
      高: "你願意面對問題並修復關係，不喜歡讓衝突懸著。你需要的是對方也願意一起負責。",
      中: "你會處理衝突，但通常需要先穩住情緒或整理脈絡，才有辦法好好說。",
      低: "你容易先抽離或降低投入，因為你不想讓自己被衝突拖進去太深。"
    },
    independence: {
      高: "你非常需要個人空間與生活主控感。過度黏著或報備，會讓你開始想往後退。",
      中: "你重視親密，也需要保留自己的節奏。你希望關係是共享，而不是互相佔滿。",
      低: "你偏好高度共享的關係。當生活能自然融合，你會更容易感覺安心與被選擇。"
    },
    emotionalSensitivity: {
      高: "你對語氣、停頓、訊息長短與氣氛變化很敏銳，常常在別人說出口前就先感覺到了。",
      中: "你能感受關係變化，但通常會等更多線索再判斷，不會只靠單一細節下結論。",
      低: "你較不容易被細節牽動，偏好對方直接說明需求與感受，而不是讓你猜。"
    }
  };

  return descriptions[dimension][level];
}

function normalizeDimensionScore(score: number) {
  const minScore = -7;
  const maxScore = 21;
  const normalized = ((score - minScore) / (maxScore - minScore)) * 100;

  return Math.round(Math.min(100, Math.max(0, normalized)));
}

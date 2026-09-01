import React, { useState, useEffect, useRef } from 'react';
import { Volume2, ArrowLeft, Star, Trophy, Sparkles, Smile, BookOpen, Gamepad2, Award, Download, Layers, User, ChevronRight, ChevronLeft } from 'lucide-react';

const categories = [
  {
    id: 'greetings',
    title: '다정하게 인사하기',
    subtitle: '친구들과 반갑게 인사해볼까요?',
    icon: '👋',
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    btnColor: 'bg-blue-500 hover:bg-blue-600',
    levels: [
      {
        level: 1,
        title: '1단계: 기초 콩닥콩닥 인사',
        phrases: [
          { en: 'Hello!', ko: '안녕! 반가워!' },
          { en: 'Hi there!', ko: '안녕 친구야!' },
          { en: 'Bye-bye!', ko: '잘 가, 안녕!' },
        ]
      },
      {
        level: 2,
        title: '2단계: 하루 시작과 안부 묻기',
        phrases: [
          { en: 'Good morning!', ko: '좋은 아침이야, 좋은 하루 보내!' },
          { en: 'How are you?', ko: '오늘 기분이 어때?' },
          { en: 'I am fine, thank you.', ko: '나는 아주 좋아, 고마워!' },
        ]
      },
      {
        level: 3,
        title: '3단계: 따뜻한 마무리 인사',
        phrases: [
          { en: 'See you later!', ko: '다음에 또 만나자!' },
          { en: 'Have a nice day!', ko: '오늘 하루도 행복하게 보내!' },
          { en: 'Good night, sleep tight.', ko: '잘 자고 꿈나라로 숑!' },
        ]
      }
    ]
  },
  {
    id: 'feelings',
    title: '내 마음 표현하기',
    subtitle: '오늘 내 기분은 어때요?',
    icon: '🥰',
    color: 'bg-pink-100 text-pink-700 border-pink-300',
    btnColor: 'bg-pink-500 hover:bg-pink-600',
    levels: [
      {
        level: 1,
        title: '1단계: 기본 기분 말하기',
        phrases: [
          { en: 'I am happy.', ko: '난 오늘 너무 행복해!' },
          { en: 'I am sad.', ko: '조금 슬프기도 해.' },
          { en: 'I am tired.', ko: '오늘은 조금 피곤한 걸.' },
        ]
      },
      {
        level: 2,
        title: '2단계: 배고픔과 목마름',
        phrases: [
          { en: 'I am hungry.', ko: '배가 고파서 맛있는 게 먹고 싶어.' },
          { en: 'I am thirsty.', ko: '목이 말라요, 시원한 물 마실래.' },
          { en: 'I am sleepy.', ko: '하품이 나와, 졸려요.' },
        ]
      },
      {
        level: 3,
        title: '3단계: 깊은 감정과 속상함',
        phrases: [
          { en: 'I am excited!', ko: '너무 설레고 기대돼!' },
          { en: 'I am angry.', ko: '속상해서 화가 났어.' },
          { en: 'I am proud of myself.', ko: '스스로가 정말 자랑스러워!' },
        ]
      }
    ]
  },
  {
    id: 'school',
    title: '학교에서 꽁냥꽁냥',
    subtitle: '친구들과 다정하게 나누는 이야기',
    icon: '🏫',
    color: 'bg-green-100 text-green-700 border-green-300',
    btnColor: 'bg-green-500 hover:bg-green-600',
    levels: [
      {
        level: 1,
        title: '1단계: 교실 속 기초 표현',
        phrases: [
          { en: 'Open your book.', ko: '예쁜 마음으로 책을 펴볼까?' },
          { en: 'Look at the board.', ko: '칠판을 함께 바라보자!' },
          { en: 'Listen carefully.', ko: '귀를 쫑긋하고 잘 들어봐.' },
        ]
      },
      {
        level: 2,
        title: '2단계: 친구와 함께 놀기',
        phrases: [
          { en: 'Let us play together.', ko: '우리 같이 재미있게 놀자!' },
          { en: 'Can I join you?', ko: '나도 같이 놀아도 될까?' },
          { en: 'Good job!', ko: '와, 정말 잘했어! 최고야!' },
        ]
      },
      {
        level: 3,
        title: '3단계: 학용품 빌리기와 질문',
        phrases: [
          { en: 'Can I borrow this?', ko: '이 연필 좀 빌려줄 수 있을까?' },
          { en: 'I have a question.', ko: '선생님, 궁금한 게 있어요!' },
          { en: 'I understand now!', ko: '이제 무슨 뜻인지 알겠어요!' },
        ]
      }
    ]
  },
  {
    id: 'weather',
    title: '날씨와 옷차림 ☀️',
    subtitle: '오늘 날씨에 맞춰 옷을 골라볼까요?',
    icon: '🌤️',
    color: 'bg-sky-100 text-sky-700 border-sky-300',
    btnColor: 'bg-sky-500 hover:bg-sky-600',
    levels: [
      {
        level: 1,
        title: '1단계: 맑고 흐린 날씨',
        phrases: [
          { en: 'It is sunny today.', ko: '오늘 날씨가 정말 화창하고 맑아!' },
          { en: 'It is cloudy.', ko: '하늘에 몽글몽글 구름이 많아요.' },
          { en: 'The sky is blue.', ko: '파란 하늘이 참 예쁘다.' },
        ]
      },
      {
        level: 2,
        title: '2단계: 비와 눈 소식',
        phrases: [
          { en: 'It is raining outside.', ko: '밖에 보슬보슬 비가 내려요.' },
          { en: 'It is snowing.', ko: '하얀 눈이 펑펑 내리고 있어!' },
          { en: 'Look at the rainbow!', ko: '저기 예쁜 무지개 좀 봐봐!' },
        ]
      },
      {
        level: 3,
        title: '3단계: 옷차림과 기온',
        phrases: [
          { en: 'It is so cold.', ko: '날씨가 추우니까 따뜻하게 입자!' },
          { en: 'Wear your hat.', ko: '햇살을 가려줄 예쁜 모자를 써봐.' },
          { en: 'It is warm today.', ko: '오늘은 포근하고 따뜻한 날이야.' },
        ]
      }
    ]
  },
  {
    id: 'food',
    title: '맛있는 간식 시간 🍪',
    subtitle: '식사 시간이나 간식을 먹을 때 쓰는 말',
    icon: '🍎',
    color: 'bg-amber-100 text-amber-700 border-amber-300',
    btnColor: 'bg-amber-500 hover:bg-amber-600',
    levels: [
      {
        level: 1,
        title: '1단계: 맛 표현하기',
        phrases: [
          { en: 'This is so yummy!', ko: '우와, 이거 정말 맛있다!' },
          { en: 'I love ice cream.', ko: '나는 달콤한 아이스크림이 제일 좋아!' },
          { en: 'It is sweet.', ko: '달콤해서 기분이 좋아져.' },
        ]
      },
      {
        level: 2,
        title: '2단계: 음료와 물 부탁하기',
        phrases: [
          { en: 'Can I have some water?', ko: '시원한 물 좀 주시겠어요?' },
          { en: 'Milk is healthy.', ko: '우유를 마시면 튼튼해져요.' },
          { en: 'Juice please.', ko: '달콤한 주스 주세요!' },
        ]
      },
      {
        level: 3,
        title: '3단계: 식사 후 소감과 나누기',
        phrases: [
          { en: 'I am full.', ko: '배가 불렀어, 정말 잘 먹었다!' },
          { en: 'Let us share.', ko: '우리 맛있는 거 사이좋게 나눠 먹자!' },
          { en: 'Thank you for the meal.', ko: '맛있게 잘 먹었습니다!' },
        ]
      }
    ]
  },
  {
    id: 'animals',
    title: '귀여운 동물 친구들 🐾',
    subtitle: '좋아하는 동물에 대해 이야기해요',
    icon: '🐶',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    btnColor: 'bg-emerald-500 hover:bg-emerald-600',
    levels: [
      {
        level: 1,
        title: '1단계: 친숙한 강아지와 고양이',
        phrases: [
          { en: 'I love puppies.', ko: '나는 귀여운 강아지가 정말 좋아.' },
          { en: 'Look at that cat.', ko: '저기 저 고양이 움직이는 것 봐!' },
          { en: 'The dog is barking.', ko: '멍멍 강아지가 짖고 있어요.' },
        ]
      },
      {
        level: 2,
        title: '2단계: 움직이는 동물들',
        phrases: [
          { en: 'The rabbit can jump.', ko: '토끼가 깡충깡충 잘도 뛰어!' },
          { en: 'Birds can fly high.', ko: '새들은 하늘 높이 날아갈 수 있어.' },
          { en: 'Fish swim in water.', ko: '물고기가 헤엄을 잘 쳐요.' },
        ]
      },
      {
        level: 3,
        title: '3단계: 동물과 우정 나누기',
        phrases: [
          { en: 'Animals are our friends.', ko: '동물들은 우리의 소중한 친구야.' },
          { en: 'Be gentle with animals.', ko: '동물들을 조심스럽고 다정하게 예뻐해 주자.' },
          { en: 'That is so cute!', ko: '저 동물 정말 귀엽다!' },
        ]
      }
    ]
  },
  {
    id: 'manners',
    title: '마법 같은 예쁜 말 ✨',
    subtitle: '마음을 따뜻하게 해주는 매너 표현',
    icon: '💖',
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    btnColor: 'bg-purple-500 hover:bg-purple-600',
    levels: [
      {
        level: 1,
        title: '1단계: 고마움과 미안함',
        phrases: [
          { en: 'Thank you so much.', ko: '정말 고마워, 마음이 따뜻해져.' },
          { en: 'I am so sorry.', ko: '미안해, 마음 상하지마.' },
          { en: 'It is okay.', ko: '괜찮아, 너무 걱정하지 마!' },
        ]
      },
      {
        level: 2,
        title: '2단계: 양보와 실례',
        phrases: [
          { en: 'Excuse me.', ko: '실례합니다, 잠시만 지나갈게요.' },
          { en: 'After you.', ko: '먼저 가세요, 양보할게요.' },
          { en: 'You are welcome.', ko: '별 말씀을요, 천만에요.' },
        ]
      },
      {
        level: 3,
        title: '3단계: 배려와 칭찬의 말',
        phrases: [
          { en: 'You are so kind.', ko: '너는 정말 마음이 예쁘고 친절하구나!' },
          { en: 'Let me help you.', ko: '내가 도와줄게, 이리 와봐.' },
          { en: 'Have a wonderful day!', ko: '오늘 하루도 멋지게 보내길 바랄게!' },
        ]
      }
    ]
  }
];

const allPhrases = categories.flatMap(cat => cat.levels.flatMap(lvl => lvl.phrases));

export default function App() {
  const [nickname, setNickname] = useState('');
  const [isNicknameSet, setIsNicknameSet] = useState(false);
  const [tempNickname, setTempNickname] = useState('');

  const [currentView, setCurrentView] = useState('home'); // 'home', 'levelSelect', 'learn', 'quiz', 'medal'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0); // 현재 선택된 단계 인덱스 (0, 1, 2)
  const [totalStars, setTotalStars] = useState(0);
  const canvasRef = useRef(null);

  const playAudio = (text, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; 
      utterance.pitch = 1.2; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const goToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedLevelIndex(0);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentView('levelSelect');
  };

  const startLearningLevel = (levelIndex) => {
    setSelectedLevelIndex(levelIndex);
    setCurrentView('learn');
  };

  const goToNextLevel = () => {
    if (selectedCategory && selectedLevelIndex < selectedCategory.levels.length - 1) {
      setSelectedLevelIndex(prev => prev + 1);
    }
  };

  const goToPrevLevel = () => {
    if (selectedLevelIndex > 0) {
      setSelectedLevelIndex(prev => prev - 1);
    }
  };

  const startQuiz = () => {
    setCurrentView('quiz');
  };

  const viewMedalRoom = () => {
    setCurrentView('medal');
  };

  const downloadMedalImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 600;

    const gradient = ctx.createLinearGradient(0, 0, 600, 600);
    gradient.addColorStop(0, '#fef08a');
    gradient.addColorStop(1, '#fed7aa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 600);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(50, 50, 500, 500, 30);
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(300, 180, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = '60px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏆', 300, 180);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('영어 왕중왕 메달', 300, 300);

    ctx.fillStyle = '#475569';
    ctx.font = '22px sans-serif';
    ctx.fillText(`반짝반짝 별 10개를 모은 멋진 "${nickname || '친구'}"!`, 300, 360);

    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('✨ 영어랑 친해지는 천사 친구 ✨', 300, 420);

    const link = document.createElement('a');
    link.download = `${nickname || 'English'}_Medal.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!isNicknameSet) {
    return (
      <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto min-h-screen">
        <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-indigo-100 w-full space-y-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600">
            <User className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-800">안녕? 반가워! 👋</h1>
            <p className="text-gray-500 font-medium">부르고 싶은 예쁜 닉네임을 알려줄래?</p>
          </div>
          <input
            type="text"
            placeholder="예: 예쁜 다솜이, 튼튼이"
            value={tempNickname}
            onChange={(e) => setTempNickname(e.target.value)}
            className="w-full px-6 py-4 text-xl border-2 border-indigo-200 rounded-2xl focus:outline-none focus:border-indigo-500 text-center font-bold text-indigo-900 bg-indigo-50/50"
            maxLength={12}
          />
          <button
            onClick={() => {
              if (tempNickname.trim()) {
                setNickname(tempNickname.trim());
                setIsNicknameSet(true);
              }
            }}
            disabled={!tempNickname.trim()}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xl py-4 rounded-2xl shadow-md transition-transform transform active:scale-95"
          >
            시작하기 ✨
          </button>
        </div>
      </div>
    );
  }

  const HomeView = () => (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-3">
        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-bold text-sm mb-2">
          반가워, {nickname} 친구! 💖
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 flex items-center justify-center gap-3">
          <Smile className="w-10 h-10 text-yellow-400" />
          영어랑 친해지는 시간
        </h1>
        <p className="text-lg text-gray-600 font-medium">안녕? 오늘도 예쁜 목소리로 영어를 만나봐요! ✨</p>
      </div>

      <div className="w-full bg-yellow-100 rounded-3xl p-5 flex items-center justify-between shadow-sm border-2 border-yellow-300">
        <div className="flex items-center gap-3 text-yellow-800 font-bold text-xl">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          {nickname}의 별: {totalStars}개 / 10개
        </div>
        {totalStars >= 10 ? (
          <button 
            onClick={viewMedalRoom}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-2xl font-bold flex items-center gap-2 shadow-md animate-bounce"
          >
            <Award className="w-6 h-6" /> 메달 보기!
          </button>
        ) : (
          <Trophy className="w-8 h-8 text-orange-500" />
        )}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => selectCategory(cat)}
            className={`flex flex-col items-start p-6 rounded-3xl border-4 transition-transform transform hover:scale-105 active:scale-95 ${cat.color} text-left shadow-md`}
          >
            <span className="text-5xl mb-3">{cat.icon}</span>
            <h2 className="text-2xl font-bold mb-1">{cat.title}</h2>
            <p className="opacity-80 font-medium">{cat.subtitle}</p>
          </button>
        ))}
      </div>

      <button
        onClick={startQuiz}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-6 rounded-3xl border-4 border-purple-700 shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        <Gamepad2 className="w-10 h-10" />
        <div className="text-left">
          <h2 className="text-2xl font-bold">✨ 별빛 퀴즈 놀이터</h2>
          <p className="text-purple-200">배운 문장들을 맞추고 예쁜 별을 모아봐요!</p>
        </div>
      </button>

      <button
        onClick={() => setIsNicknameSet(false)}
        className="text-sm text-gray-400 hover:text-gray-600 underline font-medium pt-2"
      >
        닉네임 바꾸기
      </button>
    </div>
  );

  const LevelSelectView = () => {
    if (!selectedCategory) return null;

    return (
      <div className="flex flex-col p-6 w-full max-w-2xl mx-auto min-h-screen animate-in slide-in-from-right-8 duration-300">
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-3xl shadow-sm border-2 border-gray-100">
          <button onClick={goToHome} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>{selectedCategory.icon}</span>
            {selectedCategory.title}
          </h2>
          <div className="w-10"></div>
        </div>

        <div className="space-y-4 mb-6 text-center">
          <p className="text-lg text-gray-600 font-medium">원하는 단계를 골라서 차근차근 배워봐요! 🎈</p>
        </div>

        <div className="space-y-4">
          {selectedCategory.levels.map((lvl, idx) => (
            <button
              key={lvl.level}
              onClick={() => startLearningLevel(idx)}
              className="w-full flex items-center justify-between p-6 bg-white hover:bg-indigo-50 border-3 border-indigo-200 rounded-3xl shadow-md transition-transform transform hover:scale-102 group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-extrabold text-2xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {lvl.level}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{lvl.title}</h3>
                  <p className="text-gray-500 font-medium">재미있는 문장 3개 공부하기</p>
                </div>
              </div>
              <Layers className="w-8 h-8 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const LearnView = () => {
    const [flippedCards, setFlippedCards] = useState({});

    const toggleCard = (index) => {
      setFlippedCards(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    };

    if (!selectedCategory) return null;
    const currentLevelObj = selectedCategory.levels[selectedLevelIndex];

    return (
      <div className="flex flex-col p-4 w-full max-w-2xl mx-auto h-screen max-h-[850px] animate-in slide-in-from-right-8 duration-300">
        <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-3xl shadow-sm border-2 border-gray-100">
          <button onClick={() => setCurrentView('levelSelect')} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 truncate">
            <span>{selectedCategory.icon}</span>
            <span className="truncate">{currentLevelObj.title}</span>
          </h2>
          <button onClick={goToHome} className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl font-bold">
            홈으로
          </button>
        </div>

        {/* 단계 이동 네비게이션 버튼 바 */}
        <div className="flex items-center justify-between bg-indigo-50/80 p-2 rounded-2xl mb-4 border border-indigo-100">
          <button
            onClick={goToPrevLevel}
            disabled={selectedLevelIndex === 0}
            className="flex items-center gap-1 px-3 py-2 bg-white rounded-xl text-indigo-700 font-bold text-sm shadow-sm disabled:opacity-40 hover:bg-indigo-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> 이전 단계
          </button>
          <span className="text-sm font-bold text-indigo-900">
            {selectedLevelIndex + 1} / {selectedCategory.levels.length} 단계
          </span>
          <button
            onClick={goToNextLevel}
            disabled={selectedLevelIndex === selectedCategory.levels.length - 1}
            className="flex items-center gap-1 px-3 py-2 bg-indigo-600 rounded-xl text-white font-bold text-sm shadow-md disabled:opacity-40 hover:bg-indigo-700 transition-colors"
          >
            다음 단계 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pb-10 px-1">
          {currentLevelObj.phrases.map((phrase, index) => {
            const isFlipped = flippedCards[index];
            return (
              <div
                key={index}
                onClick={() => toggleCard(index)}
                className={`relative w-full p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-sm border-2 
                  ${isFlipped ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200 hover:border-indigo-300'}
                  group min-h-[140px] flex flex-col justify-center`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="flex-1 pr-4">
                    <h3 className={`text-2xl font-bold transition-colors ${isFlipped ? 'text-indigo-900' : 'text-gray-900'}`}>
                      {phrase.en}
                    </h3>
                    
                    <div className={`mt-4 text-xl font-medium text-indigo-600 transition-all duration-300 ${isFlipped ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {phrase.ko}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => playAudio(phrase.en, e)}
                    className={`p-4 rounded-full transition-colors flex-shrink-0 ${selectedCategory.btnColor} text-white shadow-md hover:scale-110 active:scale-95`}
                    title="발음 들어보기"
                  >
                    <Volume2 className="w-8 h-8" />
                  </button>
                </div>
                
                {!isFlipped && (
                   <div className="absolute bottom-3 left-0 right-0 text-center text-sm text-gray-400 font-medium">
                     카드를 살짝 누르면 다정한 뜻이 보여요 💌
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const MedalRoomView = () => (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-lg mx-auto min-h-screen text-center space-y-6 animate-in zoom-in-95 duration-500">
      <div className="bg-yellow-100 border-4 border-yellow-400 p-8 rounded-3xl shadow-xl w-full flex flex-col items-center space-y-4">
        <Award className="w-28 h-28 text-yellow-500 drop-shadow-lg animate-bounce" />
        <h2 className="text-3xl font-extrabold text-gray-800">축하합니다! 🏆</h2>
        <p className="text-lg text-gray-600 font-medium">
          반짝반짝 별 10개를 모두 모아서<br/><span className="text-indigo-600 font-bold">{nickname} 친구</span>를 위한 특별한 메달을 획득했어요!
        </p>
        
        <div className="bg-white p-4 rounded-2xl w-full border border-yellow-200 shadow-inner flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1">메달 인증서 미리보기</span>
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-300 w-full text-center space-y-2">
            <span className="text-4xl">🥇</span>
            <h4 className="font-bold text-xl text-gray-800">영어 왕중왕 메달</h4>
            <p className="text-xs text-gray-500">열심히 공부한 멋진 {nickname}에게 수여합니다.</p>
          </div>
        </div>

        <button
          onClick={downloadMedalImage}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 transition-all"
        >
          <Download className="w-6 h-6" /> 메달 이미지 다운로드하기
        </button>
      </div>

      <button
        onClick={goToHome}
        className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-lg rounded-full shadow-sm transition-colors"
      >
        홈으로 돌아가기 🏡
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );

  const QuizView = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
      const shuffled = [...allPhrases].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      
      const quizQuestions = selected.map(phrase => {
        const type = Math.random() > 0.5 ? 'en-to-ko' : 'ko-to-en';
        
        let wrongAnswers = allPhrases
          .filter(p => p.en !== phrase.en)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
          
        let options = [];
        if (type === 'en-to-ko') {
          options = [phrase.ko, ...wrongAnswers.map(a => a.ko)];
        } else {
          options = [phrase.en, ...wrongAnswers.map(a => a.en)];
        }
        
        options.sort(() => 0.5 - Math.random());
        
        return {
          type,
          questionText: type === 'en-to-ko' ? phrase.en : phrase.ko,
          correctAnswer: type === 'en-to-ko' ? phrase.ko : phrase.en,
          options,
          originalEn: phrase.en
        };
      });
      
      setQuestions(quizQuestions);
    }, []);

    const handleAnswer = (option) => {
      if (selectedAnswer !== null) return;
      
      setSelectedAnswer(option);
      setShowResult(true);
      
      const currentQ = questions[currentIndex];
      const isCorrect = option === currentQ.correctAnswer;
      
      if (isCorrect) {
        setScore(prev => prev + 1);
        playAudio("Wonderful job!", null);
      } else {
         if (currentQ.type === 'ko-to-en') {
            playAudio(currentQ.correctAnswer, null);
         } else {
            playAudio(currentQ.originalEn, null);
         }
      }

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setIsFinished(true);
          const earnedStars = isCorrect ? score + 1 : score;
          setTotalStars(prev => prev + earnedStars);
        }
      }, 1500);
    };

    if (questions.length === 0) return <div className="p-10 text-center text-gray-500 font-medium">따뜻한 문제를 준비하고 있어요... ✨</div>;

    if (isFinished) {
      return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-lg mx-auto min-h-screen text-center space-y-6 animate-in zoom-in-95 duration-500">
          <Trophy className="w-32 h-32 text-yellow-400 drop-shadow-md" />
          <h2 className="text-4xl font-bold text-gray-800">참 잘했어요, {nickname}! </h2>
          <p className="text-2xl text-gray-600">
            총 5문제 중 <span className="text-indigo-600 font-extrabold text-3xl">{score}</span>문제를 다정하게 맞췄어요! 💖
          </p>
          <div className="flex gap-2">
             {[...Array(score)].map((_, i) => (
                <Star key={i} className="w-10 h-10 text-yellow-500 fill-yellow-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s`}} />
             ))}
          </div>

          {totalStars >= 10 && (
             <div className="bg-yellow-100 p-4 rounded-2xl border-2 border-yellow-400 text-yellow-900 font-bold animate-pulse">
                🎉 와우! 별 10개를 모아서 멋진 메달이 열렸어요!
             </div>
          )}

          <div className="flex gap-4 w-full">
            {totalStars >= 10 && (
              <button
                onClick={viewMedalRoom}
                className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Award className="w-6 h-6" /> 메달 받으러 가기!
              </button>
            )}
            <button
              onClick={goToHome}
              className={`${totalStars >= 10 ? 'flex-1' : 'w-full'} py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105`}
            >
              처음으로 돌아가기 🏡
            </button>
          </div>
        </div>
      );
    }

    const currentQ = questions[currentIndex];

    return (
      <div className="flex flex-col p-4 w-full max-w-2xl mx-auto min-h-screen">
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-3xl shadow-sm border-2 border-gray-100">
          <button onClick={goToHome} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
             <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-bold">
               질문 {currentIndex + 1} / 5
             </div>
             <div className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                <Star className="w-4 h-4 fill-yellow-500" /> {score}
             </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8 pb-10">
          <div className="text-center space-y-4">
            <p className="text-gray-500 font-bold text-lg">
              {currentQ.type === 'en-to-ko' ? '어떤 예쁜 뜻을 담고 있을까요?' : '이 마음을 영어로는 어떻게 말할까요?'}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 break-words leading-tight bg-white p-8 rounded-3xl shadow-sm border-2 border-indigo-100">
              {currentQ.questionText}
              {currentQ.type === 'en-to-ko' && (
                 <button 
                   onClick={(e) => playAudio(currentQ.questionText, e)}
                   className="block mx-auto mt-6 bg-indigo-100 text-indigo-600 p-3 rounded-full hover:bg-indigo-200 transition-transform hover:scale-110"
                   title="다시 들어보기"
                 >
                   <Volume2 className="w-8 h-8" />
                 </button>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option, idx) => {
              let btnClass = "bg-white border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300";
              
              if (showResult) {
                if (option === currentQ.correctAnswer) {
                  btnClass = "bg-green-100 border-green-500 text-green-800 font-bold";
                } else if (option === selectedAnswer) {
                  btnClass = "bg-red-100 border-red-500 text-red-800";
                } else {
                  btnClass = "bg-white border-gray-200 text-gray-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`p-6 text-xl md:text-2xl rounded-2xl border-2 text-left font-medium transition-all duration-300 shadow-sm ${btnClass}`}
                >
                  {option}
                  {showResult && option === currentQ.correctAnswer && (
                    <Sparkles className="inline-block ml-3 w-6 h-6 text-green-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200">
      {currentView === 'home' && <HomeView />}
      {currentView === 'levelSelect' && <LevelSelectView />}
      {currentView === 'learn' && <LearnView />}
      {currentView === 'quiz' && <QuizView />}
      {currentView === 'medal' && <MedalRoomView />}
    </div>
  );
}
import { useRef, useState, useEffect } from "react";

import "./App.css";

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isGiggling, setIsGiggling] = useState(false);
  const [open, setOpen] = useState(false);
  const [isForgiven, setIsForgiven] = useState(true);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    return () => {
      audio.removeEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
    };
  }, []);

  // Giggle animation every 10 seconds
  useEffect(() => {
    const giggleInterval = setInterval(() => {
      setIsGiggling(true);
      setTimeout(() => setIsGiggling(false), 1000); // Animation lasts 1 second
    }, 10000); // Every 10 seconds

    return () => clearInterval(giggleInterval);
  }, []);

  return (
    <div className="h-[100vh] bg-[#b0183d] font-Messiri flex flex-col gap-3 items-center justify-center p-6">
      <img
        src="../src/assets/Picsart_25-10-15_08-50-01-756.png"
        alt="Spider-man"
        className={`w-30 h-30 absolute top-0 left-0 ${
          isGiggling ? "giggle-animation" : ""
        }`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-sm w-full bg-[#f5f5f7] border-5 border-[#e8e8ea] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* macOS title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#e8e8ea]">
              <div className="flex gap-2">
                <span className="w-3.5 h-3.5 bg-red-500 rounded-full"></span>
                <span className="w-3.5 h-3.5 bg-yellow-400 rounded-full"></span>
                <span className="w-3.5 h-3.5 bg-green-500 rounded-full"></span>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6 flex flex-col gap-3 text-center">
              <h2 className="text-3xl font-semibold m-5">آية ، أنا آسف</h2>
              {!isForgiven && (
                <h4 className="text-red-500">
                  مفيش الكلام ده لازم تسامحيني وترجعيلي
                </h4>
              )}
              <div
                onClick={() => setIsForgiven(false)}
                className="w-full flex justify-between gap-3"
              >
                <button className="w-full px-4 py-2 border-2 border-[#b0183d] text-[#b0183d] font-bold rounded-lg transition">
                  مسامحتكش
                </button>

                <a
                  href="https://wa.me/201000754450?text=%D9%84%D8%A7%20%D8%AD%D8%B1%D9%83%D8%A9%20%D8%AD%D9%84%D9%88%D8%A9%20%D8%B9%D8%AC%D8%A8%D8%AA%D9%86%D9%8A%20%F0%9F%98%82%E2%9D%A4%EF%B8%8F%0A%D8%AE%D9%84%D8%A7%D8%B5%20%D8%B3%D8%A7%D9%85%D8%AD%D8%AA%D9%83"
                  target="_blank"
                  onClick={() => setOpen(false)}
                  className=" w-full px-4 py-2 font-bold bg-[#b0183d] text-white text-center rounded-lg  "
                >
                  سامحتك
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-sm w-full bg-white rounded-3xl shadow-lg p-5 text-center">
        {/* Image */}
        <img
          src="../src/assets/IMG_20251012_172058.jpg"
          alt="photo"
          className="w-60 h-60 mx-auto rounded-xl object-cover mb-4 shadow"
        />

        {/* Arabic text */}
        <p className="text-gray-800 mb-5 leading-relaxed font-bold">
          انتي بقيتي الأغنية دي بالنسبالي. عرفتها بسببك وعشقتها من بعدك. آسف إني
          فرطت فيكي وسيبتك تروحي
        </p>

        {/* Custom audio player */}
        <div className="bg-pink-300 rounded-2xl p-4">
          <div className="flex items-center justify-between text-sm">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              value={progress}
              onChange={handleProgressChange}
              className="w-full mx-3 accent-[#e23c64] cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex justify-center items-center mt-4 space-x-6">
            <button
              onClick={() => (audioRef.current.currentTime -= 5)}
              className="p-2 bg-pink-400 rounded-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="w-6 h-6 fill-white"
              >
                <path d="M556.2 541.6C544.2 546.6 530.5 543.8 521.3 534.7L352 365.3L352 512C352 524.9 344.2 536.6 332.2 541.6C320.2 546.6 306.5 543.8 297.3 534.7L128 365.3L128 512C128 529.7 113.7 544 96 544C78.3 544 64 529.7 64 512L64 128C64 110.3 78.3 96 96 96C113.7 96 128 110.3 128 128L128 274.7L297.4 105.4C306.6 96.2 320.3 93.5 332.3 98.5C344.3 103.5 352 115.1 352 128L352 274.7L521.4 105.3C530.6 96.1 544.3 93.4 556.3 98.4C568.3 103.4 576 115.1 576 128L576 512C576 524.9 568.2 536.6 556.2 541.6z" />
              </svg>
            </button>
            <button
              onClick={togglePlay}
              className="p-4 bg-white text-pink-500 rounded-full shadow-md text-2xl"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-10 h-10 fill-pink-500"
                >
                  <path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-10 h-10 fill-pink-500"
                >
                  <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => (audioRef.current.currentTime += 5)}
              className="p-2 bg-pink-400 rounded-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="w-6 h-6 fill-white"
              >
                <path d="M83.8 541.6C95.8 546.6 109.5 543.8 118.7 534.7L288 365.3L288 512C288 524.9 295.8 536.6 307.8 541.6C319.8 546.6 333.5 543.8 342.7 534.7L512 365.3L512 512C512 529.7 526.3 544 544 544C561.7 544 576 529.7 576 512L576 128C576 110.3 561.7 96 544 96C526.3 96 512 110.3 512 128L512 274.7L342.6 105.3C333.4 96.1 319.7 93.4 307.7 98.4C295.7 103.4 288 115.1 288 128L288 274.7L118.6 105.4C109.4 96.2 95.7 93.5 83.7 98.5C71.7 103.5 64 115.1 64 128L64 512C64 524.9 71.8 536.6 83.8 541.6z" />
              </svg>
            </button>
          </div>
        </div>

        <audio
          ref={audioRef}
          src="../src/assets/M(MP3_160K).mp3"
          onTimeUpdate={handleTimeUpdate}
        ></audio>
      </div>
      <div className="max-w-sm w-full flex flex-col gap-3 ">
        <p className="text-end font-bold text-xl text-[#fcedd8] ">
          :🙄 لينكات قد تعجبك ( مبلكاني عليهم ){" "}
        </p>
        <div className="grid grid-cols-2 gap-2 w-full">
          <a
            href="https://www.instagram.com/7z.karam?igsh=MTcydTAzZXBrcDFmdQ=="
            target="_blank"
            className=" p-2 bg-white flex items-center justify-center rounded-xl shadow-md gap-2"
          >
            <img
              className="w-10 h-10"
              src="../src/assets/instagram.png"
              alt="instagram-icon"
            />
            <p className="text-xl font-bold">انستغرام</p>
          </a>
          <a
            href="https://www.snapchat.com/add/zeyadsaif22?share_id=8cSefD9MVMo&locale=en-US"
            target="_blank"
            className=" p-2 bg-white flex items-center justify-center rounded-xl shadow-md gap-2"
          >
            <img
              className="w-10 h-10"
              src="../src/assets/snapchat.png"
              alt="snapchat-icon"
            />
            <p className="text-xl font-bold">سناب شات</p>
          </a>
          <a
            href="https://pin.it/4LynP6iiq"
            target="_blank"
            className=" p-2 bg-white flex items-center justify-center rounded-xl shadow-md gap-2"
          >
            <img
              className="w-10 h-10"
              src="../src/assets/pinterest.png"
              alt="pinterest-icon"
            />
            <p className="text-xl font-bold">بينتريست</p>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=201000754450&text=%D8%AE%D9%84%D8%A7%D8%B5+%D9%85%D8%A8%D9%82%D8%AA%D8%B4+%D8%B2%D8%B9%D9%84%D8%A7%D9%86%D8%A9+%D9%85%D9%86%D9%83+%2B+%D8%AD%D8%A8%D9%8A%D8%AA+%D8%A7%D9%84%D9%87%D8%AF%D9%8A%D8%A9+%D8%A7%D9%88%D9%8A&type=phone_number&app_absent=0"
            target="_blank"
            className=" p-2 bg-white flex items-center justify-center rounded-xl shadow-md gap-2"
          >
            <img
              className="w-10 h-10"
              src="../src/assets/whatsapp.png"
              alt="whatsapp-icon"
            />
            <p className="text-xl font-bold">واتساب</p>
          </a>
        </div>
      </div>
    </div>
  );
}

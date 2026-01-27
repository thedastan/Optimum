"use client";
export default function NotFound() {
  return (
    <main className="flex w-full h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="border rounded-[12px] p-[24px] flex flex-col text-center w-full max-w-[500px]">
        <h1 className="text-[72px] font-bold leading-[54px]">404</h1>

        <h1 className="text-[24px] font-[700] mt-2">
          Упс, страница не найдена
        </h1>

        <p className="text-[#292A2C] text-[14px]">
          Попробуйте перезапустить страницу
        </p>

        <button
          onClick={() => window.location.reload()}
          className="text-white mt-5 bg-[#131316] py-2 text-[14px] font-[600] rounded-[8px] w-full md:max-w-[452px]"
        >
          Перезапустить
        </button>
      </div>
    </main>
  );
}

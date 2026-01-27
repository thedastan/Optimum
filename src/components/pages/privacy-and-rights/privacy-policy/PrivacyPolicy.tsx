import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  const text = [
    {
      title: "Политика конфиденциальности",
      content: [
        {
          desc: "Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта optimum.kg, предоставляющего услуги по продаже автозапчастей.",
        },
      ],
    },
    {
      title: "1. Общие положения",
      content: [
        {
          desc: "1.1. Использование сайта означает согласие пользователя с данной Политикой конфиденциальности.",
        },
        {
          desc: "1.2. В случае несогласия с условиями политики пользователь должен прекратить использование сайта.",
        },
        {
          desc: "1.3. Администрация сайта оставляет за собой право изменять Политику без предварительного уведомления. Актуальная версия всегда доступна на сайте.",
        },
      ],
    },
    {
      title: "2. Какие данные мы собираем",

      Link: [
        "При использовании сайта ",
        { type: "link", href: "https://optimum.kg", text: "optimum.kg" },
        " могут собираться следующие данные:",
      ],
      content: [
        { desc: "Фамилия, имя, отчество;" },
        { desc: "Контактные данные (телефон, e-mail, адрес доставки);" },
        { desc: "Информация о заказах (история покупок, выбранные товары);" },
        {
          desc: "Данные о посещении сайта (cookies, IP-адрес, информация о браузере).",
        },
      ],
    },
    {
      title: "3. Цели обработки данных",
      content: [
        { desc: "Собранные данные используются для:" },
        { desc: "Оформления и доставки заказов;" },
        {
          desc: "Связи с пользователем (уведомления, подтверждения, служба поддержки);",
        },
        { desc: "Предоставления персонализированных предложений;" },
        { desc: "Улучшения качества работы сайта и сервиса;" },
        { desc: "Выполнения требований законодательства." },
      ],
    },
    {
      title: "4. Передача данных третьим лицам",
      content: [
        {
          desc: "Мы не передаем персональные данные пользователей третьим лицам, за исключением случаев:",
        },
        {
          desc: "когда это необходимо для выполнения заказа (службы доставки, платежные системы);",
        },
        { desc: "когда это требуется по закону;" },
        { desc: "с согласия пользователя." },
      ],
    },
    {
      title: "5. Защита данных",
      link: [
        "Администрация ",
        { type: "link", href: "https://optimum.kg", text: "optimum.kg" },
        " принимает все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.",
      ],
      content: [""],
    },
    {
      title: "6. Использование файлов cookie",
      content: [
        {
          desc: "Сайт может использовать cookies для улучшения качества обслуживания, анализа трафика и персонализации предложений. Пользователь может отключить cookies в настройках браузера, однако это может повлиять на работу сайта.",
        },
      ],
    },
    {
      title: "7. Права пользователя",
      content: [
        { desc: "Пользователь имеет право:" },
        { desc: "Получать информацию о своих персональных данных;" },
        { desc: "Требовать их исправления или удаления;" },
        {
          desc: "Отозвать согласие на обработку данных, направив соответствующий запрос в службу поддержки.",
        },
      ],
    },
  ];

  const renderTextWithLinks = (items: any[]) => (
    <p className=" ">
      {items.map((item, i) =>
        typeof item === "string" ? (
          <span key={i} className=" text-[14px] font-[400]">
            {item}
          </span>
        ) : (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-[#E60000] text-[14px] font-[400] underline"
          >
            {item.text}
          </a>
        ),
      )}
    </p>
  );

  return (
    <div className="container !py-12">
      <div className="w-full max-w-[751px]">
        {text.map((section, index) => (
          <section key={index} className="mb-8">
            <h2
              className={`mb-1  ${
                index === 0
                  ? "text-[22px] font-[700]"
                  : "text-[16px] font-[600]"
              }`}
            >
              {section.title}
            </h2>

            <div className="">
              {/* Link или link */}
              {section.Link && renderTextWithLinks(section.Link)}
              {section.link && renderTextWithLinks(section.link)}

              {/* Основной текст */}
              {section.content?.map((item: any, i: number) =>
                item?.desc ? (
                  <p
                    key={i}
                    className=" text-[14px] font-[400] leading-relaxed"
                  >
                    {item.desc}
                  </p>
                ) : null,
              )}
            </div>
          </section>
        ))}

        <h2 className={`mb-1 text-[16px] font-[600]  `}>8. Контакты</h2>
        <p className=" text-[14px] font-[400] leading-relaxed">
          По всем вопросам, связанным с обработкой персональных данных,
          обращайтесь:
        </p>

        <p className="text-[14px] font-[400] leading-relaxed">
          E-mail:{" "}
          <Link
            className="text-[#E60000]"
            href={"mailto:info@optimum.kg"}
            target={"_blank"}
          >
            info@optimum.kg
          </Link>
        </p>

        <p className="text-[14px] font-[400] leading-relaxed">
          Телефон:
          <Link href={"tel:+996702466969"} target={"_blank"}>
            +996 702 46 69 69
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

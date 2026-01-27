import Link from "next/link";
import React from "react";

const PublicOffer = () => {
  const text1 = [
    {
      title: "Публичная оферта",

      Link: [
        "Настоящий документ является официальным предложением (офертой) сайта ",
        { type: "link", href: "https://optimum.kg", text: "optimum.kg" },
        " любому физическому или юридическому лицу заключить договор купли-продажи товаров (автозапчастей) на условиях, изложенных ниже.",
      ],
      content: [""],
    },
  ];
  const text3 = [
    {
      title: "2. Предмет договора",

      Link: [
        "2.1. Продавец обязуется передать в собственность Покупателя товары (автозапчасти), представленные в каталоге на сайте ",
        { type: "link", href: "https://optimum.kg", text: "optimum.kg" },
        " а Покупатель обязуется оплатить и принять товар на условиях настоящей Оферты.",
      ],
      content: [
        {
          desc: "2.2. Характеристики и описание товаров указаны на сайте и носят справочный характер.",
        },
      ],
    },

    {
      title: "3. Оформление заказа",
      content: [
        {
          desc: "3.1. Заказ оформляется Покупателем самостоятельно через сайт либо по телефону +996 702 46 69 69.",
        },
        {
          desc: "3.2. Покупатель несет ответственность за достоверность предоставленных данных при оформлении заказа.",
        },
        {
          desc: "3.3. Продавец подтверждает заказ по телефону или через электронную почту, указанную Покупателем.",
        },
      ],
    },

    {
      title: "4. Цена и оплата",
      content: [
        {
          desc: "4.1. Цена товара указывается на сайте и может изменяться Продавцом в одностороннем порядке.",
        },
        {
          desc: "4.2. Оплата товара осуществляется наличными при получении, безналичным переводом или через доступные платежные системы.",
        },
        {
          desc: "4.3. Итоговая стоимость заказа включает цену товара, а также (при необходимости) стоимость доставки.",
        },
      ],
    },

    {
      title: "5. Доставка и получение товара",
      content: [
        {
          desc: "5.1. Доставка осуществляется по Кыргызстану и другим регионам, способ и стоимость доставки согласуются с Покупателем.",
        },
        {
          desc: "5.2. Сроки доставки зависят от наличия товара на складе и региона доставки.",
        },
        {
          desc: "5.3. Риск случайной утраты или повреждения товара переходит к Покупателю в момент передачи товара.",
        },
      ],
    },

    {
      title: "6. Гарантия и возврат товара",
      content: [
        {
          desc: "6.1. Продавец гарантирует качество и соответствие товара требованиям законодательства КР.",
        },
        {
          desc: "6.2. Возврат и обмен товаров осуществляется в соответствии с Законом КР «О защите прав потребителей».",
        },
        {
          desc: "6.3. Возврат товара возможен при условии сохранения товарного вида и документов, подтверждающих покупку.",
        },
      ],
    },

    {
      title: "7. Ответственность сторон",
      content: [
        {
          desc: "7.1. Продавец не несет ответственности за ущерб, причиненный Покупателю вследствие неправильного использования товара.",
        },
        {
          desc: "7.2. Покупатель несет ответственность за достоверность информации, предоставленной при оформлении заказа.",
        },
        {
          desc: "7.3. В случае форс-мажорных обстоятельств стороны освобождаются от ответственности за частичное или полное неисполнение обязательств.",
        },
      ],
    },

    {
      title: "8. Персональные данные",

      Link: [
        "8.1. Продавец обрабатывает персональные данные Покупателя в соответствии с Политикой конфиденциальности сайта ",
        { type: "link", href: "https://optimum.kg", text: "optimum.kg" },
      ],
      content: [""],
    },
  ];

  const text2 = [
    {
      title: "1. Общие положения",

      content: [
        {
          desc: "1.1. Настоящая Оферта является публичной и в соответствии со ст. 398 Гражданского кодекса Кыргызской Республики имеет силу публичного договора.",
        },
      ],
      Link: [
        "1.2. Факт оформления заказа на сайте ",
        { type: "link", href: "https://optimum.kg", text: "optimum.kg" },
        " означает полное и безоговорочное принятие (акцепт) условий настоящей Оферты.",
      ],
      content2: [
        {
          desc: "1.3. Администрация сайта оставляет за собой право изменять условия Оферты без предварительного уведомления. Актуальная версия всегда размещена на сайте.",
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
        {text1.map((section, index) => (
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
              {section.Link && renderTextWithLinks(section.Link)}

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

        {text2.map((section, index) => (
          <section key={index} className="mb-8 ">
            <h2 className={`mb-1 text-[16px] font-[600]  `}>{section.title}</h2>

            <div className="">
              {/* Link или link */}

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

            <div className="">
              {/* Link или link */}
              {section.Link && renderTextWithLinks(section.Link)}

              {/* Основной текст */}
              {section.content2?.map((item: any, i: number) =>
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

        {text3.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className={`mb-1 text-[16px] font-[600]  `}>{section.title}</h2>

            <div className="">
              {section.Link && renderTextWithLinks(section.Link)}

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

        <h2 className={`mb-1 text-[16px] font-[600]  `}>
          9. Контактные данные
        </h2>
        <p className=" text-[14px] font-[400] leading-relaxed">
          По всем вопросам, связанным с обработкой персональных данных,
          обращайтесь:
        </p>

        <p className="text-[14px] font-[400] leading-relaxed">
          Продавец:{" "}
          <Link
            className="text-[#E60000]"
            href={"https://optimum.kg"}
            target={"_blank"}
          >
            Optimum.kg
          </Link>
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

export default PublicOffer;

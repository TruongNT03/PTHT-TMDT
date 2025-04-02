const obj = {
  category_id: 1,
  section_id: 1,
  product_images: [],
  variants: [
    {
      variantList: [
        {
          variant: "1",
          value: "1",
        },
      ],
      price: "1",
      discount_price: "1",
      stock: "1",
    },
  ],
};

obj.variants[0].variantList[0];

const string = JSON.stringify(obj);
console.log(string);
const obj1 = JSON.parse({
  name: "Ao 3",
  description: "Ao 3",
  category_id: 1,
  section_id: 1,
  variants: [
    {
      variantList: [
        { variant: "Size", value: "XL" },
        { variant: "Mau", value: "Trang" },
      ],
      price: "120",
      discount_price: "100",
      stock: "10",
    },
    {
      variantList: [
        { variant: "Size", value: "XL" },
        { variant: "Mau", value: "Den" },
      ],
      price: "120",
      discount_price: "100",
      stock: "10",
    },
  ],
});
console.log(obj1);

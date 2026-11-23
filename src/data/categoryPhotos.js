// Photos dropped into src/assets/categories/<id>.jpg|png|webp, keyed by id
const files = import.meta.glob("../assets/categories/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

export const categoryPhotos = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split("/").pop().replace(/\.\w+$/, ""), url])
);

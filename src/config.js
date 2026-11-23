// =========================================================
// SHOP SETTINGS — change these in one place
// =========================================================

export const SHOP = {
  name: "Anchan Ayurvedic Industries",
  shortName: "Anchan Ayurveda",

  // WhatsApp number that receives orders (country code + number, no "+" or spaces)
  whatsapp: "919448445440",
  phoneDisplay: "+91 94484 45440",
  landline: "0820 2555461",
  email: "anchanayurvedic@yahoo.com",
  address: "Padubidri, Udupi District, Karnataka – 574111",
  addressLines: ["Anchan Clinic, Arjuna Complex,", "Dhanvantari Road, NH 66,", "Padubidri, Karnataka – 574111"],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Anchan+Clinic%2C+Arjuna+Complex%2C+Dhanvantari+Road%2C+NH+66%2C+Padubidri%2C+Karnataka+574111",
  website: "https://www.anchanayurveda.com",

  // Add your page links to show these icons in the footer (leave "" to hide)
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  // Orders at or above this value are delivered free (₹)
  freeDeliveryAbove: 499,

  since: 1983,
};

export const formatPrice = (n) => "₹" + Number(n).toLocaleString("en-IN");

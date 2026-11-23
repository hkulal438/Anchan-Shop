import React from "react";

// Line icons (Lucide-style, 24×24, drawn inline — no extra package)
const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3h2.6l2.4 11.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 7H6" /></>,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  trash: <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
  truck: <><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  mail: <><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" /><path d="M2 21c0-3 1.9-5.4 5.2-6.1 2.4-.5 4.9-2 5.8-3.9" /></>,
  flask: <><path d="M9 3h6" /><path d="M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3" /><path d="M7 15h10" /></>,
  scroll: <><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 17V5a2 2 0 0 0-2-2H4" /></>,
  heart: <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />,
  award: <><circle cx="12" cy="8" r="6" /><path d="M15.5 13.2 17 22l-5-3-5 3 1.5-8.8" /></>,
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  // health needs
  digestion: <><path d="M12 3c-4 0-7 2.5-7 6.5 0 3 2 4.5 4 4.5s3-1 3-2.5" /><path d="M12 3c4 0 7 2.5 7 6.5 0 6-5 11.5-10 11.5" /><path d="M9 14c0 2 1.5 3.5 3.5 3.5" /></>,
  respiratory: <><path d="M12 3v9" /><path d="M12 12c-1.5-1.5-3-2-4.5-2C5 10 3 13 3 17c0 2.5 1 4 3 4 3 0 6-2 6-6" /><path d="M12 12c1.5-1.5 3-2 4.5-2 2.5 0 4.5 3 4.5 7 0 2.5-1 4-3 4-3 0-6-2-6-6" /></>,
  joints: <><path d="M6.5 6.5a2.5 2.5 0 1 1 3.5-3.5l1 1 3 3-4 4-3-3-1-1a2.5 2.5 0 0 1 .5-.5Z" /><path d="m10.5 10.5 3 3" /><path d="M17.5 17.5a2.5 2.5 0 1 1-3.5 3.5l-1-1-3-3 4-4 3 3 1 1a2.5 2.5 0 0 1-.5.5Z" /></>,
  skin: <><path d="M12 2.5c-3 4-6 7.5-6 11.5a6 6 0 0 0 12 0c0-4-3-7.5-6-11.5Z" /><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" /></>,
  hair: <><path d="M5 21c0-9 2-15 7-17 5 2 7 8 7 17" /><path d="M9 21c0-6 1-10 3-12 2 2 3 6 3 12" /></>,
  women: <><circle cx="12" cy="8" r="5" /><path d="M12 13v8" /><path d="M9 18h6" /></>,
  diabetes: <><path d="M12 2.5C9 7 6.5 10 6.5 13.5a5.5 5.5 0 0 0 11 0C17.5 10 15 7 12 2.5Z" /><path d="M10 14h4" /><path d="M12 12v4" /></>,
  mind: <><path d="M12 5a3 3 0 1 0-5.9.8A4 4 0 0 0 4.3 12.5 4 4 0 0 0 8 18a3 3 0 0 0 4 2.8" /><path d="M12 5a3 3 0 1 1 5.9.8 4 4 0 0 1 1.8 6.7A4 4 0 0 1 16 18a3 3 0 0 1-4 2.8" /><path d="M12 5v15.8" /></>,
  immunity: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="M12 8v8" /><path d="M8 12h8" /></>,
  kids: <><circle cx="12" cy="6" r="3" /><path d="M8 22v-6l-2-4 6-2 6 2-2 4v6" /></>,
  "eye-ent": <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  fever: <><path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0Z" /><path d="M12 9v7" /></>,
  liver: <><path d="M3 9c0-3 3-5 7-5 5 0 11 1 11 5 0 5-6 11-10 11-2 0-2-3-4-5S3 12 3 9Z" /><path d="M10 4c0 4 1 7 4 9" /></>,
  men: <><circle cx="10" cy="14" r="6" /><path d="M14.5 9.5 21 3" /><path d="M15 3h6v6" /></>,
  piles: <><path d="M4 15c0-4 3.6-7 8-7s8 3 8 7" /><path d="M2 15h20v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z" /><path d="M12 8V4" /></>,
  oral: <path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 5 2 8 .4 2.6 1 5.5 2.5 5.5S9.5 17 12 17s3 4 4.5 4 2.1-2.9 2.5-5.5c.5-3 2-5 2-8C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z" />,
  weight: <><path d="M6.5 6.5h11L20 21H4Z" /><circle cx="12" cy="4" r="2.2" /><path d="m10 13 2 2 3-4" /></>,
  // mother holding a baby
  postnatal: <><circle cx="9" cy="5" r="2.5" /><path d="M5 21v-6a4 4 0 0 1 4-4h1.5" /><circle cx="15.5" cy="12.5" r="2" /><path d="M10 15.5c1.5 2.5 4 3.5 7 3.5 1.7 0 3-1 3-2.5S18.7 14 17 14h-2" /><path d="M9 21v-3" /></>,
  urinary: <><path d="M9 3C5 3 4 7 4 11s2 9 6 9c2 0 2.5-2 2.5-4s-2-3-2-5 1.5-3 1.5-5-1-3-3-3Z" /><path d="M15 3c4 0 5 4 5 8s-2 9-6 9" /></>,
};

export default function Icon({ name, size = 20, stroke = 1.8, className = "", ...rest }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm8.4-18.3A11.8 11.8 0 0 0 1.7 17.7L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.4Z" />
  </svg>
);

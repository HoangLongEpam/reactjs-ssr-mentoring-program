import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "netflix-red": "#F65261",
        "netflix-black": "#232323",
        "netflix-gray-1": "#555555",
        "netflix-gray-2": "#424242",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-image":
          "url('https://s3-alpha-sig.figma.com/img/9ab1/b611/92a81bbe79a924292111ca43f3a39e8f?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oU4pB1YvNjGluUakjThjdwPJ1wnp9Srhz1LX4mDgwVXfcUT9qdz6wnjiBqe0D81Qf4FtvJbxZP3~WdxwpFCJ-~SBZLAKBQlA5sdjTEUSCyhmpVrY46y3p08-zsmyTmakzjwtiwslmB9gJVdEQ4xhnsvrlMlPFOjwt44d9yYs3a6rriJC2Xddo6p1RHfPzKrolkmZxp-hHKxFSRsNJ8096ZekjAmkkXC0EW~yiyxnAVaiWKj8uHEc6Z~CBA2eHPjSOgMrNXT5VBArtipb6sNh4HKG94ziE2mCALlcA3LrsNP1W086zBGQ-x-gbXA22sJgdySFycJ0OAItuQi2vcH1eg__')",
      },
    },
  },
  plugins: [],
};
export default config;

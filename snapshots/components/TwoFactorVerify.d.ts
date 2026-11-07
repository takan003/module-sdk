type Mode = "email_otp" | "totp";
export default function TwoFactorVerify({ mode }: {
    mode: Mode;
}): import("react").JSX.Element;
export {};

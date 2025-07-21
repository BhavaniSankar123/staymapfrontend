export const isValidEmailOrMobile = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!value) return "Email or Mobile Number is required.";
    if (!emailRegex.test(value) && !phoneRegex.test(value))
        return "Enter a valid Email or Mobile Number.";

    return "";
};

export const isValidPassword = (value) => {
    const passwordRegex =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!value) return "Password is required.";
    if (!passwordRegex.test(value))
        return "Password must be 8-16 characters long and include uppercase, lowercase, number, and special character.";

    return "";
};

export const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return "Email is required.";
    if (!emailRegex.test(value))
        return "Enter a valid email address.";

    return "";
};

export const isValidMobile = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!value) return "Mobile number is required.";
    if (!phoneRegex.test(value))
        return "Enter a valid 10-digit mobile number.";

    return "";
};

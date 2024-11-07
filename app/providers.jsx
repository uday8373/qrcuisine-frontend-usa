import { ThemeProvider } from "next-themes";

const Providers = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      themes={["light"]}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;

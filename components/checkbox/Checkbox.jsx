import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "border-default !border",
    content: "text-default-500 text-sm font-medium !px-0 ",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-secondary bg-secondary hover:bg-secondary-500 hover:border-secondary-500",
        content: "text-secondary-foreground text-sm",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const Checkbox = (props) => {
  const {
    color = "secondary",
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        size="lg"
        radius="sm"
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color={color}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};

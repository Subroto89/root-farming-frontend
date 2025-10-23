import React from "react";
import { useTheme } from "../../../../hooks/useTheme";
import Button from "../../../../components/shared/Buttons/Button";
import Container from "../../../../components/shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";

export const ProductModeration = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  const {
    data: productsData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/products/all-products");
      return data;
    },
  });

  return (
    <div className={`${themeBackgroundStyle} min-h-screen`}>
      <Container>
        <div className="flex items-center justify-between">
          <h2>Product Moderation</h2>
          <Button label="Moderate" status="success" />
        </div>
      </Container>
    </div>
  );
};

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CategorySection } from "./CategorySection";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { CategoryCardProps } from "./CategoryCard";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the useQuery hook
jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery: jest.fn(),
}));

const mockCategories: CategoryCardProps[] = [
  {
    category: "Category Title 1",
    icon: "img1.jpg",
    alt: "category image 1",
    isActive: true,
    onClick: jest.fn(),
  },
  {
    category: "Category Title 2",
    icon: "img2.jpg",
    alt: "category image 2",
    isActive: false,
    onClick: jest.fn(),
  },
];

describe("CategorySection Component", () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  (useQuery as jest.Mock).mockReturnValue({
    data: mockCategories,
    error: null,
    isLoading: false,
  });

  beforeEach(() => {
    mockNavigate.mockClear();
    mockCategories.forEach((category) =>
      (category.onClick as jest.Mock).mockClear()
    );
  });

  it("should render category section details correctly", () => {
    render(<CategorySection isVertical />);

    // Check for category details
    expect(screen.getByText("Category Title 1")).toBeInTheDocument();
    expect(screen.getByText("Category Title 2")).toBeInTheDocument();

    // Check for image rendering
    const image1 = screen.getByAltText("category image 1");
    expect(image1).toBeInTheDocument();
    expect(image1).toHaveAttribute("src", "img1.jpg");

    const image2 = screen.getByAltText("category image 2");
    expect(image2).toBeInTheDocument();
    expect(image2).toHaveAttribute("src", "img2.jpg");
  });

  it("should navigate to the correct URL on click", () => {
    render(<CategorySection isVertical />);

    const card1 = screen.getByText("Category Title 1").parentElement;
    fireEvent.click(card1!);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/search/${mockCategories[0].category}`
    );

    const card2 = screen.getByText("Category Title 2").parentElement;
    fireEvent.click(card2!);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/search/${mockCategories[1].category}`
    );
  });

  it("should display loading state", () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: [],
      error: null,
      isLoading: true,
    });

    render(<CategorySection isVertical />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error state", () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: [],
      error: true,
      isLoading: false,
    });

    render(<CategorySection isVertical />);

    expect(screen.getByText("Error loading categories")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ServiceSection } from "./ServiceSection";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ServiceCardProps } from "./ServiceCard";

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

const mockServices: ServiceCardProps[] = [
  {
    id: "1",
    heading: "Service Heading 1",
    images: [{ url: "img1.jpg" }],
    name: "John Doe",
    address: "123 Main St, City",
    categoryTag: "Cleaning",
  },
  {
    id: "2",
    heading: "Service Heading 2",
    images: [{ url: "img2.jpg" }],
    name: "Jane Doe",
    address: "456 Elm St, City",
    categoryTag: "Plumbing",
  },
];

describe("ServiceSection Component", () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  (useQuery as jest.Mock).mockReturnValue({
    data: mockServices,
    error: null,
    isLoading: false,
  });

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render service section details correctly", () => {
    render(
      <ServiceSection filterServices={false} selectedCategory="Cleaning" />
    );

    // Check for service details
    expect(screen.getByText("Service Heading 1")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, City")).toBeInTheDocument();
    expect(screen.getByText("Cleaning")).toBeInTheDocument();

    expect(screen.getByText("Service Heading 2")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("456 Elm St, City")).toBeInTheDocument();
    expect(screen.getByText("Plumbing")).toBeInTheDocument();

    // Check for image rendering
    const image1 = screen.getByAltText("John Doe");
    expect(image1).toBeInTheDocument();
    expect(image1).toHaveAttribute("src", "img1.jpg");

    const image2 = screen.getByAltText("Jane Doe");
    expect(image2).toBeInTheDocument();
    expect(image2).toHaveAttribute("src", "img2.jpg");
  });

  it("should filter services based on selected category", () => {
    render(
      <ServiceSection filterServices={true} selectedCategory="Cleaning" />
    );

    // Check for filtered service details
    expect(screen.getByText("Service Heading 1")).toBeInTheDocument();
    expect(screen.queryByText("Service Heading 2")).not.toBeInTheDocument();
  });

  it("should display loading state", () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: [],
      error: null,
      isLoading: true,
    });

    render(
      <ServiceSection filterServices={false} selectedCategory="Cleaning" />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error state", () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: [],
      error: true,
      isLoading: false,
    });

    render(
      <ServiceSection filterServices={false} selectedCategory="Cleaning" />
    );

    expect(screen.getByText("Error loading services")).toBeInTheDocument();
  });

  it("should display no services found message", () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: [],
      error: null,
      isLoading: false,
    });

    render(
      <ServiceSection filterServices={true} selectedCategory="Nonexistent" />
    );

    expect(screen.getByText("No services found")).toBeInTheDocument();
  });
});

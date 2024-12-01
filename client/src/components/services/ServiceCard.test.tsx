import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ServiceCard, ServiceCardProps } from "./ServiceCard";
import { useNavigate } from "react-router-dom";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockService: ServiceCardProps = {
  id: "1",
  heading: "Service Heading",
  images: [{ url: "img.jpg" }],
  name: "Vardas Pavardenis",
  address: "Antakalnio g. 17, Vilnius",
  categoryTag: "Cleaning",
};

describe("ServiceCard Component", () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render service details correctly", () => {
    render(
      <ServiceCard
        id={mockService.id}
        images={mockService.images}
        categoryTag={mockService.categoryTag}
        heading={mockService.heading}
        name={mockService.name}
        address={mockService.address}
      />
    );

    // Check for text content
    expect(screen.getByText("Service Heading")).toBeInTheDocument();
    expect(screen.getByText("Vardas Pavardenis")).toBeInTheDocument();
    expect(screen.getByText("Antakalnio g. 17, Vilnius")).toBeInTheDocument();
    expect(screen.getByText("Cleaning")).toBeInTheDocument();

    // Check for image rendering
    const image = screen.getByAltText("Vardas Pavardenis");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "img.jpg");

    // Check for button click handling
    const button = screen.getByText("Book now");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(`/services/${mockService.id}`);
  });
});

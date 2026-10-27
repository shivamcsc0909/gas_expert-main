import { createContext, useContext, useState } from "react";

type BookingModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const BookingModalContext = createContext<BookingModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  return useContext(BookingModalContext);
}

import { create } from 'zustand'

interface ContactModalProps {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

const useContactModal = create<ContactModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default useContactModal
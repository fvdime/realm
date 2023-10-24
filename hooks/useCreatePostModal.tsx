import { create } from 'zustand'

interface CreatePostModalProps {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

const useCreatePostModal = create<CreatePostModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default useCreatePostModal
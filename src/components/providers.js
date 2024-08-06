import ToolbarApp from "./toolbarApp"

export default function Providers({ children }) {
  return (
    <div>
      <ToolbarApp />
      {children}
    </div>
  )
}
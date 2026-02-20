import { NavbarMinimal } from './components/Sidebar.tsx'
import { AppShell } from '@mantine/core'
import './App.css'

function App() {
  return (
    <AppShell
      navbar={{
        width: 80,
        breakpoint: 'sm',
      }}
    >
      <AppShell.Navbar>
        <NavbarMinimal />
      </AppShell.Navbar>
      <AppShell.Main>
        <h1>This is the main application page</h1>
      </AppShell.Main>
    </AppShell>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale("ko");

createRoot(document.getElementById('root')!).render(
  <App />,
)

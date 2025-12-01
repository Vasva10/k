# TODO List (React + TypeScript + JSON-Server)


## Запуск

```bash
# 1. Установить зависимости
npm install

# 2. Поднять фейковый REST API
npm run server

# 3. В отдельном терминале запустить фронтенд
npm run dev
```

Доступы:
- UI — http://localhost:5173
- REST API — http://localhost:3000/tasks

## Скрипты
- `npm run dev` — Vite dev-server
- `npm run server` — json-server с `server/db.json`
- `npm run dev:all` — запустить API и фронтенд (macOS/Linux)
- `npm run build` / `npm run preview` — прод сборка

## Стек
- React 19 + TypeScript
- Vite
- JSON-server
- Dayjs для дат, classnames для удобного применения классов

## Возможности
- CRUD для задач: создание, редактирование, удаление
- Управление статусом (active/completed) с моментальным UI-откликом
- Панель фильтров (All / Active / Completed), поиск и сортировка
- Поиск с debounce — поле реагирует мгновенно, а фильтрация выполняется с задержкой 350 мс
- Длинные описания сворачиваются с кнопкой «Показать больше/меньше», чтобы список оставался компактным
- Красивые состояния загрузки: skeleton для списка, лоадер для форм/кнопок
- Валидация форм, понятные уведомления и подписи
- Стильная адаптивная верстка

## Структура
```
src/
  components/   // TaskForm, TaskList, TaskItem, FilterBar, Loader, Skeleton, EmptyState
  hooks/        // useTasks — бизнес-логика + состояние
  services/     // общение с REST API
  types/        // типизация Task
  utils/        // константы и форматирование дат
  styles/       // глобальные стили
```

```

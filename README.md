# Инструкция разработчика

## Версии ПО

node: === 12.18.4
npm: === 6.14.6

## Как запустить проект

устанавливаем зависимости
```
npm i / yarn

старт локального сервера разработки
```
npm run dev / yarn dev
```
Перед тем, как запушить в ветку не забываем
```
npm run lint
```
## Как писать компоненты
### У нас есть три типа компонентов
1. Полностью переиспользуемые компоненты. Могут использоваться где угодно. Принимают пропсы.
2. Переиспользуемые компоненты, которые используются лишь на одной странице, или в одном разделе.
3. Уникальные компоненты, которые используются один раз. Раздают пропсы.

### Правила именования
1. Папка - `/components/shared/`. Префикс **Base**. Пример: `/components/shared/BaseButton`.
2. Папка - `/components/pages/[page]`. Префикс: **название страницы или раздела**. Пример: `/components/pages/profile/ExampleComponent`.
3. Папка - `/components/modules/`. Префикс **The**. Пример: `/components/modules/TheHeader`.

### Правила использовани
В SFC:
```html
<template>
    <some-app-component>
</template>

<script>
import SomeAppComponent from '~/components/SomeAppComponent';

export default {
    components: {
        SomeAppComponent
    }
}
</script>
```

### Пропсы
Мы не пишем `required: false`. Пропс может быть либо `required`, либо у него должно быть дефолтное состояние.

# Общие рекомендации

Vue компоненты должны соответствовать **Vue Style Guide**.
[Vue Style Guide](https://vuejs.org/v2/style-guide/)

Под каждую задачу нужно стараемся использовать оптимальные паттерны.
[Паттерны проектирования](https://refactoring.guru/ru)



import React from "react";
import {Button, ListBox, ListBoxItem} from "react-yandex-maps";
import {wsSendMessage} from "../../../common/Middleware";
import {useAppDispatch} from "../../../app/hooks";

function TopButtons(props: { width: string }) {

    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(wsSendMessage({type: "logOut"}))
    }

    return (
        <>
            <ListBox data={{content: "Управление картой"}} options={{floatIndex: 6}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Перемещение"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Фрагменты"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Зафиксировать экран"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Снять фиксацию"}}/>
            </ListBox>
            <ListBox data={{content: "Связь"}} options={{floatIndex: 5}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Состояние связи с базой"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Состояние связи с сервером"}}/>
            </ListBox>
            <ListBox data={{content: "Просмотр перекрёстков"}} options={{floatIndex: 4}}>
                <ListBoxItem options={{selectOnClick: true}} data={{content: "Активировать выбор перекрёстков"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Открыть просмотр"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Очистить список перекрёстков"}}/>
            </ListBox>
            <Button
                onClick={handleClick}
                options={{maxWidth: props.width, selectOnClick: false, float: "right", floatIndex: 3}}
                data={{content: "Выход"}}
                defaultState={{selected: false}}
            />
            <ListBox data={{content: "Помощь"}} options={{float: "right", floatIndex: 2}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Инструкция"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "О производителе"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Техническая поддержка"}}/>
            </ListBox>
            <ListBox data={{content: "Администрирование"}} options={{float: "right", floatIndex: 1}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Сменить пользователя"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Сменить пароль"}}/>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Таблица прав и данных операторов, названий АРМов"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Просмотр лицензии"}}/>
            </ListBox>
            <ListBox data={{content: "Настройки"}} options={{float: "right", floatIndex: 0}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Создание фрагментов"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Удаление фрагментов"}}/>
            </ListBox>
        </>
    )
}

export default TopButtons
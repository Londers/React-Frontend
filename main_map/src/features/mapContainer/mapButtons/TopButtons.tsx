import React, {useState} from "react";
import {Button, ListBox, ListBoxItem, YMapsApi} from "react-yandex-maps";
import {wsSendMessage} from "../../../common/Middleware";
import {useAppDispatch} from "../../../app/hooks";
import AreaDialog from "../../../common/AreaDialog";
import './TopButtons.sass'

function TopButtons(props: { ymaps: YMapsApi | null, width: string }) {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(wsSendMessage({type: "logOut"}))
    }

    const handleJump = () => {
        setOpenDialog(true)
    }

    const setOpenMiddleware = (open: boolean, region: string, area: string[]) => {
        setOpenDialog(open)
        if ((region === "") || (area.length === 0)) return
        dispatch(wsSendMessage({type: "jump", region, area}))
    }

    const itemLayout = props.ymaps?.templateLayoutFactory.createClass(
        "<div class='listbox__list-item listbox__list-item-text'>{{data.content}}</div>"
    )

    return (
        <>
            <ListBox data={{content: "Управление картой"}} options={{floatIndex: 6, itemLayout}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Перемещение"}} style={{margin: "0 13px"}}
                             onClick={handleJump}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Фрагменты"}}/>
                {/*<ListBoxItem options={{selectOnClick: false}} data={{content: "Зафиксировать экран"}}/>*/}
                {/*<ListBoxItem options={{selectOnClick: false}} data={{content: "Снять фиксацию"}}/>*/}
            </ListBox>
            <AreaDialog open={openDialog} setOpen={setOpenMiddleware} showAreas={true}/>
            <ListBox data={{content: "Связь"}} options={{floatIndex: 5, itemLayout}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Состояние связи с базой"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Состояние связи с сервером"}}/>
            </ListBox>
            <ListBox data={{content: "Просмотр перекрёстков"}} options={{floatIndex: 4, itemLayout}}>
                <ListBoxItem options={{selectOnClick: true}} data={{content: "Активировать выбор перекрёстков"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Открыть просмотр"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Очистить список перекрёстков"}}/>
            </ListBox>
            <Button
                onClick={handleLogout}
                options={{maxWidth: props.width, selectOnClick: false, float: "right", floatIndex: 3}}
                data={{content: "Выход"}}
                defaultState={{selected: false}}
            />
            <ListBox data={{content: "Помощь"}} options={{float: "right", floatIndex: 2, itemLayout}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Инструкция"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "О производителе"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Техническая поддержка"}}/>
            </ListBox>
            <ListBox data={{content: "Администрирование"}} options={{float: "right", floatIndex: 1, itemLayout}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Сменить пользователя"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Сменить пароль"}}/>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Таблица прав и данных операторов, названий АРМов"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Просмотр лицензии"}}/>
            </ListBox>
            <ListBox data={{content: "Настройки"}} options={{float: "right", floatIndex: 0, itemLayout}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Создание фрагментов"}}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Удаление фрагментов"}}/>
            </ListBox>
        </>
    )
}

export default TopButtons
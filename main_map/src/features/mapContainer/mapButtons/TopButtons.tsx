import React, {useState} from "react";
import {Button, ListBox, ListBoxItem, YMapsApi} from "react-yandex-maps";
import {wsSendMessage} from "../../../common/Middleware";
import {useAppDispatch} from "../../../app/hooks";
import AreaDialog from "../../../common/AreaDialog";
import './TopButtons.sass'
import FragmentDialog from "../../../common/FragmentDialog";

function TopButtons(props: { ymaps: YMapsApi | null, width: string }) {
    const [openAreaDialog, setOpenAreaDialog] = useState<boolean>(false)
    const [openFragmentsDialog, setOpenFragmentsDialog] = useState<boolean>(false)
    const [creatingFragment, setCreatingFragment] = useState<boolean>()
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(wsSendMessage({type: "logOut"}))
    }

    const handleJump = () => {
        setOpenAreaDialog(true)
    }

    const handleFragments = () => {
        setOpenFragmentsDialog(true)
    }

    const startFragmentCreating = () => {
        setCreatingFragment(true)
    }

    const createFragment = () => {

    }

    const setOpenAreaMiddleware = (open: boolean, region: string, area: string[]) => {
        setOpenAreaDialog(open)
        if ((region === "") || (area.length === 0)) return
        dispatch(wsSendMessage({type: "jump", region, area}))
    }

    const itemLayout = props.ymaps?.templateLayoutFactory.createClass(
        "<div class='listbox__list-item listbox__list-item-text'>{{data.content}}</div>"
    )

    return (creatingFragment ?
            <>
                <Button
                    onClick={createFragment}
                    options={{
                        maxWidth: props.width,
                        selectOnClick: false,
                        float: "none",
                        position: {top: `.6rem`, left: "45vw"},
                        floatIndex: 4
                    }}
                    data={{content: "Создать"}}
                    defaultState={{selected: false}}
                />
                <Button
                    onClick={() => setCreatingFragment(false)}
                    options={{
                        maxWidth: props.width,
                        selectOnClick: false,
                        float: "none",
                        position: {top: `.6rem`, left: "55vw"},
                        floatIndex: 3
                    }}
                    data={{content: "Назад"}}
                    defaultState={{selected: false}}
                />
            </>
            :
            <>
                <ListBox data={{content: "Управление картой"}} options={{floatIndex: 6, itemLayout}}>
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Перемещение"}} onClick={handleJump}/>
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Фрагменты"}}
                                 onClick={handleFragments}/>
                    {/*<ListBoxItem options={{selectOnClick: false}} data={{content: "Зафиксировать экран"}}/>*/}
                    {/*<ListBoxItem options={{selectOnClick: false}} data={{content: "Снять фиксацию"}}/>*/}
                </ListBox>
                <AreaDialog open={openAreaDialog} setOpen={setOpenAreaMiddleware} showAreas={true}/>
                <FragmentDialog open={openFragmentsDialog} setOpen={setOpenFragmentsDialog}/>
                <ListBox data={{content: "Связь"}} options={{floatIndex: 5, itemLayout}}>
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Состояние связи с базой"}}/>
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Состояние связи с сервером"}}/>
                </ListBox>
                <ListBox data={{content: "Просмотр перекрёстков"}} options={{floatIndex: 4}}>
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
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Таблица данных операторов"}}/>
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Просмотр лицензии"}}/>
                </ListBox>
                <ListBox data={{content: "Настройки"}} options={{float: "right", floatIndex: 0, itemLayout}}>
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Создание фрагментов"}}
                                 onClick={startFragmentCreating}/>
                    <ListBoxItem options={{selectOnClick: false}} data={{content: "Удаление фрагментов"}}/>
                </ListBox>
            </>

    )
}

export default TopButtons
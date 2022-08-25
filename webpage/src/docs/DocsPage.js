import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function DocsPage() {
    const page = useParams().page
    //что это / как голосовать /как создать голосование / как редактировать голосование // как скачать данные
    function drawMain() {
        return <div className='main'>
            <h2>Choose это инструмент для создания голосований</h2>
            <div className='picture'>
                <img src='/table-help.png' />
            </div>
            <div className='description'>
                <ul>
                    <li>Количество для выбора:</li>
                    Количество карточек которые пользователю будет необходимо выбрать
                    <li>Кнопка настроек:</li>
                    Открывает и закрывает панель настроек. Доступна только создателю голосования
                    <li>Карточки:</li>
                    Массив данных, переданных при создании голосования. Карточка недоступна если ее выбрало максимум людей.<br/> Недоступные карточки можно скрыть или снять ограничение в панели настроек
                    <li>Поля данных:</li>
                    Устанавливаются при создании голосования. Можно менять в панели настроек.
                </ul>
            </div>
        </div>
    }
    function drawHowToVote(){
        return <div className='main'>
        <h2>Как голосовать</h2>
        <div className='picture'>
            <img src='/table-how-to-vote.png' />
        </div>
        <div className='description'>
            <ol>
                <li>Посмотри в левый верхний угол</li>
                Там указано сколько карточек необходимо выбрать для этого голосования
                <li>Заполни свои данные</li>
                В центре находятся поля для данных. Необходимо их оставить чтобы понять что этот голос твой
                <li>Выбери понравившиеся карточки</li>
                Ниже находятся карточки для выбора. Выбери самые крутые из них кроме серых, их уже выбрал кто-то другой
                <li>Нажми кнопку подтвердить</li>
                Твой голос сохранится и создатель голосования обязательно его учтет
            </ol>
        </div>
    </div>
    }
    function drawPage() {
        if (page == 'main') {
            return drawMain()
        }else if(page == 'howToVote'){
            return drawHowToVote()
        }
    }
    return (
        <div className='docs'>
            <h1>Документация</h1>
            <div className='content'>
                <Link to='/docs/main' className={page == 'main' ? 'chosen' : ''}>
                    Что это
                </Link>
                <Link to='/docs/howToVote' className={page == 'howToVote' ? 'chosen' : ''}>
                    Как голосовать
                </Link>
                <Link to='/docs/howToCreate' className={page == 'howToCreate' ? 'chosen' : ''}>
                    Как создать голосование
                </Link>
                <Link to='/docs/howToChange' className={page == 'howToChange' ? 'chosen' : ''}>
                    Как редактировать голосование
                </Link>
                <Link to='/docs/howToDownload' className={page == 'howToDownload' ? 'chosen' : ''}>
                    Как скачать данные
                </Link>
            </div>
            {drawPage()}
        </div>
    )
}

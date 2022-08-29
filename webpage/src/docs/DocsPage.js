import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom'

export default function DocsPage() {
    const page = useParams().page
    const { t } = useTranslation();
    //что это / как голосовать /как создать голосование / как редактировать голосование // как скачать данные
    function drawMain() {
        return <div className='main'>
            <h2>{t("docs.main.h2")}</h2>
            <div className='picture'>
                <img src={'/' + t("pictures-folder") + '/table-help.png'} />
            </div>
            <div className='description'>
                <ul>
                    <li>{t("docs.main.li1")}</li>
                    {t("docs.main.li1-data")}
                    <li>{t("docs.main.li2")}</li>
                    {t("docs.main.li2-data")}
                    <li>{t("docs.main.li3")}</li>
                    {t("docs.main.li3-data")}
                    <li>{t("docs.main.li4")}</li>
                    {t("docs.main.li4-data")}
                </ul>
            </div>
            <Link to='/docs/howToVote' className='new-table'>
                <div className='new-table-href docs-button'>
                    {t("docs.how-to-vote.header")}
                </div>
            </Link>
        </div>
    }

    function drawHowToVote() {
        return <div className='main'>
            <h2>{t("docs.how-to-vote.header")}</h2>
            <div className='picture'>
                <img src={'/' + t("pictures-folder") + '/table-how-to-vote.png'} />
            </div>
            <div className='description'>
                <ol>
                    <li>{t("docs.how-to-vote.li1")}</li>
                    {t("docs.how-to-vote.li1-data")}
                    <li>{t("docs.how-to-vote.li2")}</li>
                    {t("docs.how-to-vote.li2-data")}
                    <li>{t("docs.how-to-vote.li3")}</li>
                    {t("docs.how-to-vote.li3-data")}
                    <li>{t("docs.how-to-vote.li4")}</li>
                    {t("docs.how-to-vote.li4-data")}

                </ol>
            </div>
            <Link to='/docs/howToCreate' className='new-table'>
                <div className='new-table-href docs-button'>
                    {t("docs.how-to-create.header")}
                </div>
            </Link>
        </div>
    }

    function drawHowToCreate() {
        return <div className='create'>
            <h2>{t("docs.how-to-create.header")}</h2>
            <div className='steps'>
                <ol>
                    <li>{t("docs.how-to-create.li1")}</li>
                    {t("docs.how-to-create.li1-data")}
                    <li>{t("docs.how-to-create.li2")}</li>
                    {t("docs.how-to-create.li2-data")}
                    <li>{t("docs.how-to-create.li3")}</li>
                    {t("docs.how-to-create.li3-data")}
                    <div className='formats'>
                        <div className='JSON'>
                            <img src='/json-format.png' />
                            <div>
                                {t("docs.how-to-create.JSON")}
                            </div>
                        </div>
                        <div className='Excel'>
                            <img src='/excel-format.png' />
                            <div>
                                {t("docs.how-to-create.Excel")}
                            </div>
                        </div>
                    </div>
                    <li>{t("docs.how-to-create.li4")}</li>
                    <div className='settings'>
                        <div className='text'>
                            <div>{t("docs.how-to-create.li4-data.div1")}</div>
                            <div>{t("docs.how-to-create.li4-data.div2")}</div>
                            <div>{t("docs.how-to-create.li4-data.div3")}</div>
                            <div>{t("docs.how-to-create.li4-data.div4")}</div>
                        </div>
                        <img src={'/' + t("pictures-folder") + '/settings.png'} />
                    </div>

                </ol>
            </div>
            <Link to='/docs/howToChange' className='new-table'>
                <div className='new-table-href docs-button'>
                {t("docs.how-to-change.header")}
                </div>
            </Link>
        </div>
    }

    function drawHowToChange() {
        return <div className='create'>
            <h2>{t("docs.how-to-change.header")}</h2>
            <div className='steps'>
                <ol>
                    <li>{t("docs.how-to-change.li1")}</li>
                    {t("docs.how-to-change.li1-data")}
                    <li>{t("docs.how-to-change.li2")}</li>
                    {t("docs.how-to-change.li2-data")}
                    <li>{t("docs.how-to-change.li3")}</li>
                    {t("docs.how-to-change.li3-data")}
                    <li>{t("docs.how-to-change.li4")}</li>
                    <div className='settings'>
                        <div className='text'>
                            <div>{t("docs.how-to-change.li4-data.div1")}</div>
                            <div>{t("docs.how-to-change.li4-data.div2")}</div>
                            <div>{t("docs.how-to-change.li4-data.div3")}</div>
                            <div>{t("docs.how-to-change.li4-data.div4")}</div>
                            <div>{t("docs.how-to-change.li4-data.div5")}</div>
                        </div>
                        <img src={'/' + t("pictures-folder") + '/settings-panel.png'} />
                    </div>

                </ol>
            </div>
            <Link to='/docs/howToDownload' className='new-table'>
                <div className='new-table-href docs-button'>
                    {t("docs.how-to-change.button")}
                </div>
            </Link>
        </div>
    }

    function drawHowToDownload() {
        return <div className='create'>
            <h2>{t("docs.how-to-download.header")}</h2>
            <div className='steps'>
                <ol>
                    <li>{t("docs.how-to-download.li1")}</li>
                    {t("docs.how-to-download.li1-data")}
                    <li>{t("docs.how-to-download.li2")}</li>
                    {t("docs.how-to-download.li2-data")}
                    <li>{t("docs.how-to-download.li3")}</li>
                    {t("docs.how-to-download.li3-data")}
                    <li>{t("docs.how-to-download.li4")}</li>
                    {t("docs.how-to-download.li4-data")}
                    <div className='settings final-data'>
                        <img className='final-json' src='/final-data-json.png' />
                        <img src='/final-data-excel.png' />
                    </div>

                </ol>
            </div>
        </div>
    }

    function drawPage() {
        if (page == 'main') {
            return drawMain()
        } else if (page == 'howToVote') {
            return drawHowToVote()
        } else if (page == 'howToCreate') {
            return drawHowToCreate()
        } else if (page == 'howToChange') {
            return drawHowToChange()
        } else if (page == 'howToDownload') {
            return drawHowToDownload()
        }
    }
    return (
        <div className='docs'>
            <h1>{t("documentation")}</h1>
            <div className='content'>
                <Link to='/docs/main' className={page == 'main' ? 'chosen' : ''}>
                    {t("docs.main.header")}
                </Link>
                <Link to='/docs/howToVote' className={page == 'howToVote' ? 'chosen' : ''}>
                    {t("docs.how-to-vote.header")}
                </Link>
                <Link to='/docs/howToCreate' className={page == 'howToCreate' ? 'chosen' : ''}>
                    {t("docs.how-to-create.header")}
                </Link>
                <Link to='/docs/howToChange' className={page == 'howToChange' ? 'chosen' : ''}>
                    {t("docs.how-to-change.header")}
                </Link>
                <Link to='/docs/howToDownload' className={page == 'howToDownload' ? 'chosen' : ''}>
                    {t("docs.how-to-download.header")}
                </Link>
            </div>
            {drawPage()}
        </div>
    )
}

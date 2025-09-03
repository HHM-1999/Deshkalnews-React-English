import DocumentTitle from 'react-document-title'


export default function ErrorPageEn() {
    return (
        <main>
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title="404 - Page Not Found" />
                <div className="row my-5">
                    <div className="ErrorBody col-8 offset-2">
                        <div className='Errors'>
                            4<span>0</span>4
                        </div>
                        <h1 className='ErrorHeader'>Page not found</h1>
                        <p className='ErrorText'>The page you required is not found. We are sincerely sorry for that. We are taking you back to the home page. Thank you for staying with DeshKalNews.com :: দেশকালনিউজ.কম.
                            <br />
                            Any of your opinion will enrich us. Please email us your feedback: <a href="mailto:newsroom@DeshKalNews.com"><span>newsroom@DeshKalNews.com.</span></a></p>
                        <button className='ErrorsBtn mt-4'>
                            <a href="/">Back To Home Page</a>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

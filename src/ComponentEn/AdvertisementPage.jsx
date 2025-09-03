import DocumentTitle from 'react-document-title'
// import pdfFile from '../ComponentEn/Deshkalnews Rate Card.pdf'
import pdfFile from '../ComponentEn/DeshkalnewsRateCard.pdf'


export default function AdvertisementPage() {
    return (
        <>
            <main>
                <div className="container">
                    <div className="advertise-page">
                        <div className="TopHomeSection"></div>
                        <DocumentTitle title='Advertisement :: Deshkalnews' />
                        <h1 className="DTitleAdvertise"><span className="DTitleInner"><span className="DTitleInnerBar"><span>Advertisement</span></span></span></h1>
                        <div className="row mt-3">
                            <div className="col-md-11 m-auto">
                                {/* <div className='advertise-section'>
                                    <iframe
                                        src={pdfFile}
                                        // width="100%"
                                        // height="900px"
                                        style={{ border: 'none' }}
                                        title="Rate Card PDF"
                                    ></iframe>
                                </div> */}
                                {/* <div style={{ height: '100vh', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                    <iframe
                                        src={pdfFile}
                                        style={{
                                            width: '100%',
                                            height: '100vh',
                                            border: 'none',
                                        }}
                                        title="Rate Card PDF"
                                    />
                                </div> */}
                                <div style={{ height: '90vh', overflowY: 'scroll', WebkitOverflowScrolling: 'touch' }}>
                                    <iframe
                                        src={pdfFile}
                                        title="PDF"
                                        style={{
                                            width: '100%',
                                            height: '100vh',
                                            border: 'none',
                                        }}
                                        typeof='application/pdf'
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

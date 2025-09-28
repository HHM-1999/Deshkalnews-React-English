import DocumentTitle from 'react-document-title';
import samprotikDeshkal from '../assets/media/common/samprotik-deshkal-logo.png'
import DeshkalPotrika from '../assets/media/common/deshkal-potrika-logo.png'
const About = () => {
    return (
        <>
            <DocumentTitle title='DeshKalNews.com :: About' />
            <div className='page-english'>
                <div className="container">
                    <div className="SectionTitleEn"><h1><span className="ColorBox"></span>About for DeshKalNews.com</h1></div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='about-section'>
                                <div className="about-area">
                                    <h2>History</h2>
                                    <p>Deshkal News is a leading online news platform and a proud subsidiary of Radiant Publications, which publishes the popular weekly <span><a href="https://epaper.shampratikdeshkal.com/" target='_blank' rel="noreferrer">Shampratik Deshkal(<img src={samprotikDeshkal} alt="Shampratik Deshkal" title='Shampratik Deshkal' className='ShampratikDeshkal' />)</a></span> and the quarterly magazine <span><a href="https://www.deshkalpotrika.com/" target='_blank' rel="noreferrer">Deshkal Potrika (<img src={DeshkalPotrika} alt="Deshkal Potrika" title='Deshkal Potrika'/> )</a></span>.</p>
                                    <p>Guided by the slogan “Accurate News, On Time”, we are committed to delivering objective, timely and reliable journalism to readers across the nation and the globe. Our foremost aim is to ensure the swift and precise dissemination of news through digital platforms, keeping our audience informed wherever they are.</p>
                                </div>
                                <div className="about-area">
                                    <h2>Our Mission</h2>
                                    <p>In rapidly evolving digital era, where misinformation poses an ever-growing challenge, Deshkal News stands firmly committed to neutrality, professionalism and journalistic integrity. Our mission is to provide the latest, most accurate and analytically rich news coverage from both domestic and international arenas—delivered promptly and responsibly. We uphold the fundamental principles of the Constitution and remain dedicated to safeguarding national sovereignty, democracy and social harmony. Through our work, we strive to strengthen public trust in responsible journalism and foster informed civic engagement.</p>
                                </div>
                                <div className="about-area">
                                    <h2>Ethical Principles</h2>
                                    <p>At Deshkal News, we adhere to the highest ethical standards, ensuring that our journalism remains grounded in fairness, accuracy and objectivity. The trust of our readers is our most valuable asset and we work tirelessly to preserve it. Our editorial independence is absolute: no political party, interest group, or external influence shapes our content or policies. We remain impartial when reporting on contentious issues and take an unwavering stand on matters of national interest, human rights, the rule of law and press freedom.</p>
                                </div>
                                <div className="about-area">
                                    <h2>Fact-Checking Policy</h2>
                                    <p>Accuracy lies at the heart of our journalism. We regard fact-checking as an indispensable pillar of responsible journalism. Prior to publication, all information undergoes rigorous verification, cross-referenced through multiple independent sources. With an extensive network of correspondents covering all 64 districts of Bangladesh, we gather insights from diverse perspectives, ensuring a balanced representation of events. Our editorial team corroborates information through eyewitness accounts, local sources and relevant administrative authorities, leaving no room for misinformation.</p>
                                </div>
                                <div className="about-area">
                                    <h2>Correction Policy</h2>
                                    <p>While we strive for precision in every report, we recognise that occasional errors are an unavoidable part of journalism. In such instances, we act swiftly and transparently. Minor errors are corrected immediately within the article.</p>
                                    <p>For significant inaccuracies, we issue a formal ‘Rejoinder’ on our website, clarifying the nature of the correction and the reasons behind it. We believe that acknowledging mistakes openly is integral to maintaining credibility and strengthening reader trust.</p>
                                </div>
                                <div className="about-area">
                                    <h2>Organisational Structure</h2>
                                    <p>Deshkal News operates under a structured and collaborative framework designed to ensure efficient and quality-driven reporting. The Editor leads all divisions, including Reporting and Editorial units. Each department is supervised by a designated in-charge to ensure smooth coordination. The Chief Reporter oversees the reporting team, while the News Editor manages the central news desk. Specialised departments—including Digital, Sports, Entertainment, International, Features and Marketing—are independently operated by their respective leads to ensure in-depth and expert-driven coverage.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}

export default About;
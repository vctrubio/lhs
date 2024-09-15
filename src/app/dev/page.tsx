
interface ItermProps {
    title: string;
    content: string;
}

const Iterm = () => {
    const intermProps: ItermProps = {
        title: 'LHS',
        content: 'Concept of living -- Looking for the best deals Madrid'
    }

    return (
        <div className="iterm">
            <div className="container-twoes">
                <div className="tv">
                    <div>
                       <div className="sandog">$</div>
                       <div className="caplog"></div>
                    </div>
                    <div id="search-result">
                        rest of text
                    </div>
                </div>
                <div className="tv-controller">
                    <div className="title">{intermProps.title}</div>
                    <div className="content">
                        <div className="content-one">{intermProps.content.split('--')[0]}</div>
                        <div className="content-two">{intermProps.content.split('--')[1]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const Testing = () => {
    return (<>
        get sexy with me
        <Iterm />
    </>);
}

export default Testing;
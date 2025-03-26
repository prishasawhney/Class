import * as React from 'react';
const loadLordIconScript = () => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
};

const BadgesComponent = () => {
    useEffect(() => {
        loadLordIconScript();
    }, []);
    return (
        <div id="badgesComponent">
            <div id="gold">
                <lord-icon
                    src="https://cdn.lordicon.com/olaidovj.json"
                    trigger="hover"
                    style="width:250px;height:250px">
                </lord-icon>
            </div>
            <div id="silver"></div>
            <div id="bronze"></div>
        </div>
    )
};

export default BadgesComponent;

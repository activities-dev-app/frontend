"use client"

import { useTheme } from "@/context";
import { ObjectType } from "@/types";
import { LinkObjectLabel } from "./LinkObjectLabel";
import { LinkObjectUrl } from "./LinkObjectUrl";
import { LinkObjectComment } from "./LinkObjectComment";
import { Button } from "@/components";
import { useDataContext } from "@/app/(dashboard)/context";
import { useCallback, useEffect, useState } from "react";
import { getWebsiteDetails } from "./api";
import Icon from "@/icons";

export type LinkObjectType = {
    url: string;
    label: string,
    comment: string,
}

const LinkObjectComponent = ({ obj }: { obj: ObjectType }) => {

    const { mode } = useTheme();

    const { removeObject, updateObject } = useDataContext();

    const [showControls, setShowControls] = useState<boolean>(false);

    const { linkData } = obj;

    const updateLink = useCallback(() => {
        if (linkData && linkData.url) {
            getWebsiteDetails(linkData.url)
                .then(r => {
                    updateObject({
                        objKey: obj.key, type: "link", linkUpdates: {
                            title: r.title,
                            description: r.description,
                            images: r.images,
                            favicon: r.favicon,
                            domain: r.domain,
                            sitename: r.sitename,
                        }
                    });
                })
                .catch(err => console.log(err));
        }
    }, [linkData, obj.key, updateObject]);

    if (!linkData) return null;

    return (
        <div className={`link link--${mode}`}>
            <div className="link__preview">

                <div className="link__favicon-wrapper">
                    {
                        linkData.favicon ?
                            // eslint-disable-next-line @next/next/no-img-element
                            <img className="link__favicon" src={linkData.favicon} alt="site fav icon" /> :
                            (linkData.images && linkData.images.length > 0 ?
                                // eslint-disable-next-line @next/next/no-img-element
                                <img className="link__favicon" src={linkData.images[0]} alt="site fav icon" /> :
                                <Icon icon="link" className="link__favicon" />
                            )
                    }
                </div>
                {linkData && linkData.title ?
                    <div className="link__title">{linkData.title}</div> :
                    <div className="link__title">
                        <LinkObjectLabel link={linkData as LinkObjectType} objKey={obj.key} />
                    </div>
                }
                <div className="link__description">{linkData.description}</div>

                <div className="link__site-image-wrapper">
                    {linkData.images && linkData.images.length > 0 &&
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            className="link__site-image"
                            src={linkData.images[0]}
                            alt="site-image"
                            width={"100%"}
                            height={"100%"}
                        />
                    }
                </div>
            </div>
            <LinkObjectUrl link={linkData as LinkObjectType} objKey={obj.key} />
            <LinkObjectComment link={linkData as LinkObjectType} objKey={obj.key} />
            <div className="link__details">
                <Button onClick={() => setShowControls(!showControls)}>{showControls ? "Less" : "More"}</Button>
                {
                    showControls &&
                    <div className="link__controls">
                        <Button onClick={() => updateLink()}>Update link</Button>
                        <Button onClick={() => removeObject(obj.key)}>Remove link</Button>
                    </div>
                }
            </div>
        </div >
    );
};

export default LinkObjectComponent;



/* 
{
  "title": "A Complete Guide to CSS Grid | CSS-Tricks - CSS-Tricks",
  "description": "Our comprehensive guide to CSS grid, focusing on all the settings both for the grid parent container and the grid child elements.",
  "images": [
    "https://css-tricks.com/wp-json/social-image-generator/v1/image/343682"
  ],
  "sitename": "CSS-Tricks",
  "favicon": "https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=32%2C32&ssl=1",
  "duration": 220,
  "domain": "css-tricks.com",
  "url": "https://css-tricks.com/snippets/css/complete-guide-grid/"
}
*/
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { ArrowLeft, Clock, Share2 } from 'lucide-react'
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {newsScrip} from "@/services/Utils.ts";
import {newsData} from "@/layout/NewsListLayout.tsx";
import {TagRemove} from "@/hooks/tagRemove.ts";
import {convertPubDate} from "@/page/expert/news/NewsList.tsx";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";

export const NewsArticleDetail=()=> {
  const navigate = useNavigate()
  const location = useLocation()
  const news:newsData = location.state;
  const [content, setContent] = useState<string>('')
  const [author, setAuthor] = useState<string>('')

  useEffect(() => {
    newsScrip(news.link).then((data) => {
      setAuthor(data[0].news_author)
      setContent(data[1].news_contents)
    })
  }, []);

  return (
      <div className={"sm:container sm:mx-auto h-screen py-8"}>
        <main className="flex flex-row h-full overflow-hidden mx-auto py-4">
          <SideMenubar/>
          <div className="container  px-6 max-w-5xl w-full">

            <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4"/> 목록으로
            </Button>

            <article className={'bg-white/5 rounded-lg overflow-hidden shadow-xl w-full p-10'}>
              <h1 className="text-3xl font-bold mb-4">{TagRemove(news.title)}</h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={"text-lg font-semibold flex items-center"}>{author && author}</div>
                  <Badge variant="secondary">반려동물</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => window.open(news.link, "_blank")}>
                  <Share2 className="mr-2 h-4 w-4"/>
                  공유하기
                </Button>
              </div>

              <Separator className="my-6"/>

              <div className="flex flex-col md:flex-row gap-8">
                <main className="w-full">
                  <div className="prose max-w-none">
                    <p className="text-sm text-muted-foreground mb-4">발행일: {convertPubDate(news.pubDate)}</p>
                    {content && content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-wrap">{paragraph}</p>
                    ))}
                  </div>
                </main>
              </div>
            </article>
          </div>
        </main>
      </div>
          )
          }
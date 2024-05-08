import { titleFont } from '@/config/fonts'
import React from 'react'

interface TitleProps {
  className?: string
  title: string
  subtitle?: string
}
export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`${className} mt-3`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-5`}
      >
        {title}
      </h1>
      {subtitle && <h3 className={'mb-5'}>{subtitle}</h3>}
    </div>
  )
}

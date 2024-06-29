'use client'

import { MoonIcon, Settings, SunIcon, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { memo } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const themes = ['light', 'dark', 'system'] as const

const ModeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal">
                <SunMoon className="w-6 h-6" />
                <span className="hidden lg:block">Theme</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>Choose your theme</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {themes.map((t) => (
                    <DropdownMenuItem
                        key={t}
                        className={`cursor-pointer flex items-center gap-3 capitalize ${
                            theme === t && 'font-bold text-primary'
                        }`}
                        onClick={() => setTheme(t)}
                    >
                        {t === 'light' && <SunIcon />}
                        {t === 'dark' && <MoonIcon />}
                        {t === 'system' && <Settings />}
                        <span>{t}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(ModeToggle)

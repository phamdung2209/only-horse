import UnderlineText from '~/components/decorators/underline-text'
import HeroSection from './hero-section'
import TodayHighlight from './today-highlight'

const AuthScreen = () => {
    return (
        <div className="flex flex-col">
            <HeroSection />

            <div className="mb-20 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <p className="text-3xl md:text-5xl tracking-tight mt-4 bottom-8 font-semibold text-center">
                        Today's{' '}
                        <UnderlineText className="underline-offset-8 md:underline-offset-[12px] decoration-wavy">
                            Highlight
                        </UnderlineText>
                        <span className="text-2xl md:text-4xl mt-1">👇</span>
                    </p>

                    {/* FEATURE POST */}
                    <div className="flex flex-col gap-10 mt-10">
                        <TodayHighlight />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen

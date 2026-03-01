export default function SectionHeading({ title, subtitle, light = false }) {
  return (
    <div className="text-center mb-12">
      <h2 className={`font-serif text-3xl md:text-4xl font-semibold mb-4 ${light ? 'text-white' : 'text-sage-800'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-sage-100' : 'text-sage-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 w-16 h-0.5 mx-auto ${light ? 'bg-blush-300' : 'bg-blush-400'}`} />
    </div>
  )
}

import { motion } from "motion/react"

export default function MarqueeRow({
  items,
  reverse = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  reverse?: boolean
}) {
  const duplicated = [...items, ...items]

  return (
    <div className="relative overflow-hidden left-1/2  -translate-x-1/2 py-4">
      <motion.div
        className="flex gap-8"
        animate={{
          x: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 45,
        }}
      >
        {duplicated.map((item, i) => {
          const highlight = reverse
            ? i % 2 === 0
            : i % 2 !== 0

          return (
            <div
              key={i}
              className={`
                flex gap-4 rounded-2xl p-6 min-w-md hover:shadow-md
                ${
                  highlight
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white border border-neutral-200 hover:bg-gray-50"
                }
              `}
            >
              <img
                src={item.avatar}
                className="h-full w-32 rounded-xl object-cover shrink-0"
                alt={item.name}
              />

              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p
                  className={`text-sm mb-2 ${
                    highlight ? "text-white/80" : "text-neutral-500"
                  }`}
                >
                  {item.role}
                </p>
                <p
                  className={`text-sm leading-relaxed ${
                    highlight ? "text-white/90" : "text-neutral-600"
                  }`}
                >
                  “{item.quote}”
                </p>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

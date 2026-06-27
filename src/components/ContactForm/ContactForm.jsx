"use client"

import { useState } from "react"
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton"

export const ContactForm = ({ t = {} }) => {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		message: "",
	})

	const [agree, setAgree] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState(false)

	// phone validation
	const isValidPhone = (phone) => {
		const cleaned = phone.replace(/\s/g, "")
		return /^\+?\d{9,15}$/.test(cleaned)
	}

	const handleChange = (e) => {
		let { name, value } = e.target

		// allow only numbers and +
		if (name === "phone") {
			value = value.replace(/[^\d+]/g, "")
		}

		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError("")
		setSuccess(false)

		// checkbox validation
		if (!agree) {
			setError("Вы должны согласиться с политикой конфиденциальности")
			return
		}

		// phone validation
		if (!isValidPhone(formData.phone)) {
			setError("Введите корректный номер телефона")
			return
		}

		// required fields
		if (!formData.name || !formData.message) {
			setError("Заполните все поля")
			return
		}

		try {
			setLoading(true)

			const res = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})

			const data = await res.json()

			if (!data.success) {
				setError(data.error || "Ошибка отправки")
				return
			}

			setSuccess(true)

			setFormData({
				name: "",
				phone: "",
				message: "",
			})

			setAgree(false)
		} catch (err) {
			setError("Ошибка сервера")
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			{/* NAME + PHONE */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder={t.form?.name_placeholder || "Имя"}
					className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm outline-none focus:border-[#C59D5F]/50"
				/>

				<input
					type="text"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					placeholder="+998 99 989 88 99"
					className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm outline-none focus:border-[#C59D5F]/50"
				/>
			</div>

			{/* MESSAGE */}
			<textarea
				rows="4"
				name="message"
				value={formData.message}
				onChange={handleChange}
				placeholder={t.form?.message_label || "Сообщение"}
				className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm resize-none outline-none focus:border-[#C59D5F]/50"
			/>

			{/* CHECKBOX */}
			<div className="flex items-center gap-3 py-2">
				<input
					type="checkbox"
					checked={agree}
					onChange={(e) => setAgree(e.target.checked)}
					className="w-4 h-4 accent-[#C59D5F] cursor-pointer"
				/>

				<label className="text-[11px] text-gray-400 italic cursor-pointer">
					{t.form?.privacy || "Согласие с политикой конфиденциальности"}
				</label>
			</div>

			{/* ERROR */}
			{error && (
				<p className="text-red-400 text-sm">
					{error}
				</p>
			)}

			{/* SUCCESS */}
			{success && (
				<p className="text-green-400 text-sm">
					Сообщение успешно отправлено
				</p>
			)}

			{/* SUBMIT */}
			<GoldButton
				type="submit"
				className="w-full"
				disabled={loading}
			>
				{loading ? "Отправка..." : t.form?.submit || "Отправить"}
			</GoldButton>
		</form>
	)
}
import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { axiosInstance } from '@shared/utils/axiosInstance'

const schema = Yup.object({
  name: Yup.string().required('Название обязательно'),
  url: Yup.string().url('Введите корректный URL').required('URL обязателен'),
  email: Yup.string().email('Некорректный email'),
})

const SuggestForm = () => {
  const [success, setSuccess] = useState(false)

  const formik = useFormik({
    initialValues: { name: '', url: '', email: '' },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axiosInstance.post('/api/suggest', values)
        setSuccess(true)
        resetForm()
      } catch {
        setSuccess(false)
      }
    },
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 480, width: '100%' }}>
      <Typography variant="h6" gutterBottom>Предложить вуз</Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>Спасибо! Предложение отправлено.</Alert>}

      <TextField fullWidth label="Название вуза" name="name"
        value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
        error={formik.touched.name && !!formik.errors.name}
        helperText={formik.touched.name && formik.errors.name}
        sx={{ mb: 2 }}
      />
      <TextField fullWidth label="Сайт (https://...)" name="url"
        value={formik.values.url} onChange={formik.handleChange} onBlur={formik.handleBlur}
        error={formik.touched.url && !!formik.errors.url}
        helperText={formik.touched.url && formik.errors.url}
        sx={{ mb: 2 }}
      />
      <TextField fullWidth label="Email (необязательно)" name="email"
        value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
        Отправить
      </Button>
    </Box>
  )
}

export default SuggestForm

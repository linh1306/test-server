
export interface IOptionSearchPage {
  page_size?: number,
  current_page?: number
  total_count?: number
}

const propertiesSchema = {
  typeInvoice: { type: String, enum: ['purchase', 'sale'], },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: [String] },
  phone: { type: String },
  status: { type: Boolean },
  create_at: { type: Date },
  exp_at: { type: Date },
  role: { type: String },
  urlImage: { type: String },
  price: { type: Number },
  unitsInStock: { type: Number },
  description: { type: String },
  quantity: { type: Number },
  percentSale: { type: Number },
  numberOfReviews: { type: Number },
  sumRating: { type: Number },
  unit: { type: String },
  rate: { type: Number },
  total: { type: Number },
  statusInvoice: { type: String },
  code: { type: String },
  value: { type: Number },
  totalRevenue: { type: Number },
  interest: { type: Number },
  marketing: { type: Number },
  totalDiscount: { type: Number },
  revenue: { type: Number },
  importPrice: { type: Number },
  isCancel: { type: Boolean }
}

export default propertiesSchema
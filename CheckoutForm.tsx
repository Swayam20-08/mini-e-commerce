'use client';

import { useState } from 'react';
import { X, CreditCard, Wallet, Apple } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CheckoutForm as CheckoutFormType, Address } from '@/types';

interface CheckoutFormProps {
  onClose: () => void;
  cartTotal: number;
}

export default function CheckoutForm({ onClose, cartTotal }: CheckoutFormProps) {
  const { cart, addOrder, user, closeCart } = useStore();
  const [formData, setFormData] = useState<CheckoutFormType>({
    shippingAddress: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate shipping address
    if (!formData.shippingAddress.firstName) newErrors.firstName = 'First name is required';
    if (!formData.shippingAddress.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.shippingAddress.email) newErrors.email = 'Email is required';
    if (!formData.shippingAddress.phone) newErrors.phone = 'Phone is required';
    if (!formData.shippingAddress.address) newErrors.address = 'Address is required';
    if (!formData.shippingAddress.city) newErrors.city = 'City is required';
    if (!formData.shippingAddress.state) newErrors.state = 'State is required';
    if (!formData.shippingAddress.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.shippingAddress.country) newErrors.country = 'Country is required';

    // Validate payment method
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order = {
      id: Date.now().toString(),
      userId: user!.id,
      items: cart,
      total: cartTotal,
      status: 'pending' as const,
      shippingAddress: formData.shippingAddress,
      paymentMethod: formData.paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addOrder(order);
    closeCart();
    onClose();

    // Show success message
    alert('Order placed successfully! Thank you for your purchase.');
  };

  const updateShippingAddress = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value
      }
    }));
  };

  const updatePaymentInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.shippingAddress.firstName}
                    onChange={(e) => updateShippingAddress('firstName', e.target.value)}
                    className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.shippingAddress.lastName}
                    onChange={(e) => updateShippingAddress('lastName', e.target.value)}
                    className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.shippingAddress.email}
                    onChange={(e) => updateShippingAddress('email', e.target.value)}
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.shippingAddress.phone}
                    onChange={(e) => updateShippingAddress('phone', e.target.value)}
                    className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.shippingAddress.address}
                    onChange={(e) => updateShippingAddress('address', e.target.value)}
                    className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.shippingAddress.city}
                    onChange={(e) => updateShippingAddress('city', e.target.value)}
                    className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.shippingAddress.state}
                    onChange={(e) => updateShippingAddress('state', e.target.value)}
                    className={`input-field ${errors.state ? 'border-red-500' : ''}`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={formData.shippingAddress.zipCode}
                    onChange={(e) => updateShippingAddress('zipCode', e.target.value)}
                    className={`input-field ${errors.zipCode ? 'border-red-500' : ''}`}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.shippingAddress.country}
                    onChange={(e) => updateShippingAddress('country', e.target.value)}
                    className={`input-field ${errors.country ? 'border-red-500' : ''}`}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={(e) => updatePaymentInfo('paymentMethod', e.target.value)}
                      className="text-primary-600"
                    />
                    <CreditCard size={20} />
                    <span>Credit Card</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={(e) => updatePaymentInfo('paymentMethod', e.target.value)}
                      className="text-primary-600"
                    />
                    <Wallet size={20} />
                    <span>PayPal</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="apple-pay"
                      checked={formData.paymentMethod === 'apple-pay'}
                      onChange={(e) => updatePaymentInfo('paymentMethod', e.target.value)}
                      className="text-primary-600"
                    />
                    <Apple size={20} />
                    <span>Apple Pay</span>
                  </label>
                </div>

                {formData.paymentMethod === 'credit-card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.cardName || ''}
                        onChange={(e) => updatePaymentInfo('cardName', e.target.value)}
                        className={`input-field ${errors.cardName ? 'border-red-500' : ''}`}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber || ''}
                        onChange={(e) => updatePaymentInfo('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className={`input-field ${errors.cardNumber ? 'border-red-500' : ''}`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={formData.cardExpiry || ''}
                        onChange={(e) => updatePaymentInfo('cardExpiry', e.target.value)}
                        placeholder="MM/YY"
                        className={`input-field ${errors.cardExpiry ? 'border-red-500' : ''}`}
                      />
                      {errors.cardExpiry && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={formData.cardCvv || ''}
                        onChange={(e) => updatePaymentInfo('cardCvv', e.target.value)}
                        placeholder="123"
                        className={`input-field ${errors.cardCvv ? 'border-red-500' : ''}`}
                      />
                      {errors.cardCvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardCvv}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : `Place Order - $${(cartTotal * 1.08).toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 
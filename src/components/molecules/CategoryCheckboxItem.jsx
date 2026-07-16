import { Checkbox } from '../atoms/Checkbox.jsx'
import { Badge } from '../atoms/Badge.jsx'

export function CategoryCheckboxItem({ nombre, checked, onChange, acreditada }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <Checkbox id={`categoria-${nombre}`} checked={checked} onChange={onChange} label={nombre} />
      {acreditada && <Badge tono="exito">✓ Acreditado</Badge>}
    </div>
  )
}

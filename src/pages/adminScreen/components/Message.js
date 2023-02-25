import { DatePicker, Collapse, theme, Pagination } from "antd"
import { CaretRightOutlined } from '@ant-design/icons';
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

const { Panel } = Collapse
dayjs.extend(customParseFormat)

function Message(){
  const format = "DD/MM/YYYY"
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 16,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  return (
    <>
      <span>Date: </span>
      <DatePicker defaultValue={dayjs(new Date())} format={format} />
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{
          // background: token.colorBgContainer,
          marginTop: 16
        }}
      >
        <Panel header="This is panel header 1" key="1" style={panelStyle}>
          <p>dadfd</p>
        </Panel>
        <Panel header="This is panel header 2" key="2" style={panelStyle}>
          <p>dsfsdff</p>
        </Panel>
        <Panel header="This is panel header 3" key="3" style={panelStyle}>
          <p>dsfsdff</p>
        </Panel>
      </Collapse>
      <Pagination size="small" defaultCurrent={1} total={50} />
    </>
  )
}

export default Message


"use client"

import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import fetchBackend from "@/utils/commonFetch";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ThemeContext } from '@/components/providers';


function ShowItems() {
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    async function init() {
      const result = await fetchBackend("/graph/", "GET");
      setNodes(result);
    }
    init();
  }, [])

  return (
    <Box>
      <Box>
        Hey :D
      </Box>
      <ul>
        {
          nodes.map(item => (
            <li>{item.properties.name} {item.properties.code}</li>
          ))
        }
      </ul>
    </Box>
  )
}


// Componente para renderizar un nodo del árbol
const TreeNode = ({ node, onToggle, theIndex }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setAlertContent } = useContext(ThemeContext);

  useEffect(() => {
    if (isExpanded) {
      const fetchChildren = async () => {
        setLoading(true);
        try {
          // const response = [{ properties: { code: "test", name: "Aqui estoy" } }]
          const response = await fetchBackend("/graph/node-children", "GET", {}, { node_code: node.properties.code });

          setChildren(response);
        } catch (error) {
          console.error('Error fetching children:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchChildren();
    }
  }, [isExpanded, node.properties.code]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle(node.properties.code);
  };

  function showNodeDetails(data) {
    // Si no hay datos, mostramos un mensaje en vez de la tabla
    if (!data || typeof data !== 'object') {
      return <p>No data available</p>;
    }

    // Obtener las claves del objeto para los encabezados
    const entries = Object.entries(data);

    return (
      <div>
        <h4>Detailed node</h4>
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          {entries.map(([key, value]) => (
            <div key={key} style={{ display: 'flex', marginBottom: '8px' }}>
              <div style={{ flex: 1, fontWeight: 'bold' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</div>
              <div style={{ flex: 2 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: '30px', padding: "10px", width: "400px" }}>
      <div style={{ display: "flex", justifyContent: "start" }}>
        <div style={{ marginRight: "10px" }}>{theIndex}</div>
        <div><small>{node.properties.code}</small> {node.properties.name}</div>
        <div style={{ cursor: 'pointer', marginLeft: "10px", display: "flex" }}>
          <div><InfoOutlinedIcon onClick={() => setAlertContent(showNodeDetails(node.properties))} fontSize='small' color='primary' /></div>
          <div onClick={handleToggle}>{isExpanded ? '[-]' : '[+]'}</div>
        </div>
      </div>
      {isExpanded && (
        <div>
          {loading ? <p>Cargando...</p> : (
            <div>
              {children.map((child, index) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  onToggle={onToggle}
                  // expandedNodes={expandedNodes}
                  theIndex={`${theIndex}.${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente principal
const TreeView = () => {
  const [rootNodes, setRootNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  useEffect(() => {
    const fetchRootNodes = async () => {
      try {
        const result = await fetchBackend("/graph/", "GET");
        setRootNodes(result);
      } catch (error) {
        console.error('Error fetching root nodes:', error);
      }
    };

    fetchRootNodes();
  }, []);

  const handleToggle = (nodeId) => {
    setExpandedNodes(prev => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(nodeId)) {
        newExpandedNodes.delete(nodeId);
      } else {
        newExpandedNodes.add(nodeId);
      }
      return newExpandedNodes;
    });
  };

  return (
    <div>
      <h1>Árbol de Datos</h1>
      {rootNodes.map((node, index) => (
        <TreeNode
          key={node.properties.code}
          node={node}
          onToggle={handleToggle}
          expandedNodes={expandedNodes}
          theIndex={index + 1}
        />
      ))}
    </div>
  );
};
export default TreeView;